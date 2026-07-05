// 355. Design Twitter

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

// Set of followeeId
type FolloweeIds = Set<number>;
// Map of followerId - followees
type FollowMap = Map<number, FolloweeIds>;

// Array of (time counter, tweetId)
// (timeCounter in asc order for max heap)
type Tweet = [number, number];
// Map of userId - tweets
type TweetMap = Map<number, Tweet[]>;

interface TwitterInterface {
  postTweet(userId: number, tweetId: number): void;
  getNewsFeed(userId: number): number[];
  follow(followerId: number, followeeId: number): void;
  unfollow(followerId: number, followeeId: number): void;
}

class Twitter implements TwitterInterface {
  tweetMap: TweetMap;
  followMap: FollowMap;
  timeCount = 0

  constructor() {
    this.tweetMap = new Map();
    this.followMap = new Map();
  }

  getNewTimeCount() {
    return this.timeCount++
  }

  /**
   * T: O(1); S: O(1);
   */
  postTweet(userId: number, tweetId: number): void {
    if (!this.tweetMap.has(userId)) {
      this.tweetMap.set(userId, [])
    }

    const newTweet = [this.getNewTimeCount(), tweetId] as Tweet
    const tweets = this.tweetMap.get(userId)!;
    tweets.push(newTweet)

    // Store top 10 latest tweets per user.
    if (tweets.length > 10) {
      tweets.shift()
    }
  }

  /**
   * T: O(m log m + k log m); S: O(m);
   * m for number of followees
   * k for extractoins and potential re-push
   */
  getNewsFeed(userId: number): number[] {
    // Must return self tweet
    this.follow(userId, userId)

    // Max heap to store top tweets
    const maxHeap = new MaxPriorityQueue<{
      tweet: Tweet,
      followeeId: number,
      index: number
    }>((x) => x.tweet[0]);
    const followeeIds = this.followMap.get(userId)!;

    // K-way merge:
    // Don't push all tweets to maxHeap at once.
    // Push one tweet from each follwee, then fetch the next valid tweet
    for (const id of followeeIds) {
      const tweets = this.tweetMap.get(id)

      if (tweets && tweets.length > 0) {
        const lastIdx = tweets.length - 1
        maxHeap.push({
          tweet: tweets[lastIdx],
          followeeId: id,
          index: lastIdx
        })
      }
    }

    const res: number[] = []
    // Extract top 10 tweets from users
    while (!maxHeap.isEmpty() && res.length < 10) {
      const {
        tweet,
        followeeId,
        index
      } = maxHeap.pop()!;

      res.push(tweet[1])

      if (index > 0) {
        const nextIdx = index - 1
        const tweets = this.tweetMap.get(followeeId)!
        maxHeap.push({
          tweet: tweets[nextIdx],
          followeeId,
          index: nextIdx
        })
      }
    }

    return res
  }

  /**
   * T: O(1); S: O(1);
   */
  follow(followerId: number, followeeId: number): void {
    if (!this.followMap.has(followerId)) {
      this.followMap.set(followerId, new Set())
    }
    this.followMap.get(followerId)!.add(followeeId)
  }

  /**
   * T: O(1); S: O(1);
   */
  unfollow(followerId: number, followeeId: number): void {
    if (this.followMap.has(followerId)) {
      this.followMap.get(followerId)!.delete(followeeId)
    }
  }
}

/**
 * --- Tester ---
 */
function runTests(
  name: string,
  TwitterClass: new () => TwitterInterface,
) {
  const testCases = [
    {
      name: "Basic Operations",
      steps: [
        { op: "postTweet", args: [1, 5] },
        { op: "getNewsFeed", args: [1], expected: [5] },
        { op: "follow", args: [1, 2] },
        { op: "postTweet", args: [2, 6] },
        { op: "getNewsFeed", args: [1], expected: [6, 5] },
        { op: "unfollow", args: [1, 2] },
        { op: "getNewsFeed", args: [1], expected: [5] }
      ]
    },
    {
      name: "Edge Cases (Empty feed, self-follow)",
      steps: [
        { op: "getNewsFeed", args: [1], expected: [] },
        { op: "follow", args: [1, 1] },
        { op: "postTweet", args: [1, 10] },
        { op: "getNewsFeed", args: [1], expected: [10] }
      ]
    }
  ];

  console.log(`--- Running Suite: ${name} ---`);

  for (const tc of testCases) {
    const twitter = new TwitterClass();
    console.log(`Test Case: ${tc.name}`);

    for (const step of tc.steps) {
      // @ts-ignore - dynamic method calling
      const result = twitter[step.op](...step.args);

      if (step.expected !== undefined) {
        const passed = JSON.stringify(result) === JSON.stringify(step.expected);
        console.log(`  [${passed ? "PASS" : "FAIL"}] ${step.op}(${step.args.join(", ")})`);
        if (!passed) {
          console.log(`    Expected: ${JSON.stringify(step.expected)}, Got: ${JSON.stringify(result)}`);
        }
      }
    }
  }
}


runTests("Twitter Implementation", Twitter);
