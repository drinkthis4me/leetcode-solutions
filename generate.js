import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---
const outputDir = './src/';

/**
 * Converts a string to PascalCase (e.g., 'my-component' -> 'MyComponent').
 * @param {string} str The input string.
 * @returns The PascalCase string.
 */
function toPascalCase(str) {
    // Handle kebab-case, snake_case, and camelCase
    return str
        .replace(/[-_](\w)/g, (_, c) => c.toUpperCase()) // Convert separators to upper case
        .replace(/^[a-z]/, (c) => c.toUpperCase());    // Ensure first letter is capitalized
}

function getTemplateContent() {
    // Use the componentNamePascal in the template
return `// Problem name
function solution(param: any): any {
    
};

const param = []
const expected = 0

const ans = solution(param)

console.log('Input: ', param)
console.log('expected: ', expected)
console.log('answer: ', ans)
`;
}

/**
 * Executes the file generation process.
 */
function generateTemplateFile() {
    // 1. Get arguments from the command line
    // process.argv is an array: [node_path, script_path, arg1, arg2, ...]
    const args = process.argv.slice(2);
    const componentNameArg = args[0];

    if (!componentNameArg) {
        console.error('❌ Error: Please provide a name for the file.');
        console.log('Usage: node generateTemplate.ts <fileName>');
        return;
    }

    // 2. Format the name
    const componentNamePascal = toPascalCase(componentNameArg);
    const fileName = `${componentNamePascal}.ts`;
    const fullPath = path.join(outputDir, fileName);

    if (fs.existsSync(fullPath)) {
        console.error(`⚠️  File already exists at: ${fullPath}`);
        process.exit(1); // Exit with an error code
    }
    
    try {
        const templateContent = getTemplateContent();
        // 3. Ensure the output directory exists
        fs.mkdirSync(outputDir, { recursive: true });

        // 4. Write the content to the file
        fs.writeFileSync(fullPath, templateContent, 'utf8');
        
        // 5. Success message
        console.log(`✅ Successfully generated template file: ${fullPath}`);

    } catch (error) {
        // 6. Error handling
        console.error(`❌ Error generating file: ${fullPath}`, error);
    }
}

// Execute the function
generateTemplateFile();