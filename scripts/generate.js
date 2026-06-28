import * as fs from 'fs';
import * as path from 'path';

const outputDir = './src/';

const defaultTemplate = `// Problem name

function solution(param: any): any {
    
};
`

function checkFileName(str) {
    return /^\d{4}$/.test(str)
}

function generateTemplateFile() {
    const args = process.argv.slice(2);
    const fileNameArg = args[0];

    if (!fileNameArg || !checkFileName(fileNameArg)) {
        console.error('❌ Error: Please provide a valid name for the file.');
        console.log('Usage: pnpm generate <fileName>');
        return;
    }

    // 2. Format the name
    const fileName = `${fileNameArg.toString()}.ts`;
    const fullPath = path.join(outputDir, fileName);

    if (fs.existsSync(fullPath)) {
        console.error(`⚠️  File already exists at: ${fullPath}`);
        process.exit(1);
    }

    try {
        fs.mkdirSync(outputDir, { recursive: true });

        fs.writeFileSync(fullPath, defaultTemplate, 'utf8');

        console.log(`✅ Successfully generated template file: ${fullPath}`);

    } catch (error) {
        console.error(`❌ Error generating file: ${fullPath}`, error);
    }
}

generateTemplateFile();