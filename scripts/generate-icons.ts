/**
 * Icon Generation Script
 *
 * This script automatically converts SVG files to React components
 * and generates the icon registry.
 *
 * Usage:
 *   npx ts-node scripts/generate-icons.ts <svg-folder-path>
 *
 * Example:
 *   npx ts-node scripts/generate-icons.ts /path/to/svg/icons
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ICONS_OUTPUT_DIR = path.join(__dirname, '../src/components/Icon/icons');

/**
 * Convert kebab-case to PascalCase
 * e.g., "activity-square" -> "ActivitySquare"
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Convert SVG content to React component
 */
function svgToReactComponent(svgContent: string, componentName: string): string {
  // Extract the inner content of the SVG (everything between <svg> and </svg>)
  const innerContentMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const innerContent = innerContentMatch ? innerContentMatch[1].trim() : '';

  // Convert SVG attributes to React (camelCase)
  const reactInnerContent = innerContent
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/font-family=/g, 'fontFamily=')
    .replace(/font-size=/g, 'fontSize=')
    .replace(/font-weight=/g, 'fontWeight=')
    .replace(/text-anchor=/g, 'textAnchor=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    // Replace hardcoded colors with currentColor
    .replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="currentColor"')
    .replace(/stroke="#[0-9A-Fa-f]{3}"/g, 'stroke="currentColor"')
    .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')
    .replace(/fill="#[0-9A-Fa-f]{3}"/g, 'fill="currentColor"')
    // Keep fill="none" as is
    .replace(/fill="currentColor"(\s+)/g, (match, space) => {
      // Check if this was originally "none"
      return match;
    });

  // Handle fill="none" separately - don't replace it
  const finalContent = reactInnerContent
    .replace(/fill="currentColor"/g, 'fill="none"')
    .replace(/stroke="currentColor"/g, 'stroke="currentColor"');

  // Actually, let's be smarter about this - preserve fill="none" and only replace actual colors
  const smartContent = innerContent
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/font-family=/g, 'fontFamily=')
    .replace(/font-size=/g, 'fontSize=')
    .replace(/font-weight=/g, 'fontWeight=')
    .replace(/text-anchor=/g, 'textAnchor=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    // Replace hardcoded stroke colors with currentColor (but not "none")
    .replace(/stroke="(?!none)#[0-9A-Fa-f]{3,6}"/g, 'stroke="currentColor"')
    // Replace hardcoded fill colors with currentColor (but not "none")
    .replace(/fill="(?!none)#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"');

  return `export const ${componentName}Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    ${smartContent}
  </svg>
);
`;
}

/**
 * Generate the index.ts file with all imports and registry
 */
function generateIndexFile(iconNames: string[]): string {
  // Sort alphabetically
  const sortedNames = [...iconNames].sort();

  // Generate imports
  const imports = sortedNames
    .map((name) => {
      const pascalName = toPascalCase(name);
      return `import { ${pascalName}Icon } from './${name}';`;
    })
    .join('\n');

  // Generate registry entries
  const registryEntries = sortedNames
    .map((name) => {
      const pascalName = toPascalCase(name);
      // Use quotes for names with hyphens
      const key = name.includes('-') ? `'${name}'` : name;
      return `  ${key}: ${pascalName}Icon,`;
    })
    .join('\n');

  return `${imports}

/**
 * Icon registry mapping icon names to their components
 *
 * This file is AUTO-GENERATED by scripts/generate-icons.ts
 * Do not edit manually. To add new icons, run:
 *   npx ts-node scripts/generate-icons.ts <svg-folder-path>
 */
export const iconRegistry = {
${registryEntries}
} as const;

/**
 * Type-safe icon names derived from the registry
 */
export type IconName = keyof typeof iconRegistry;

/**
 * Array of all available icon names (useful for Storybook and documentation)
 */
export const iconNames = Object.keys(iconRegistry) as IconName[];
`;
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: npx ts-node scripts/generate-icons.ts <svg-folder-path>');
    console.error('Example: npx ts-node scripts/generate-icons.ts /path/to/svg/icons');
    process.exit(1);
  }

  const svgFolderPath = args[0];

  // Check if folder exists
  if (!fs.existsSync(svgFolderPath)) {
    console.error(`Error: Folder not found: ${svgFolderPath}`);
    process.exit(1);
  }

  // Get all SVG files
  const svgFiles = fs.readdirSync(svgFolderPath).filter((file) => file.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.error('Error: No SVG files found in the specified folder');
    process.exit(1);
  }

  console.log(`Found ${svgFiles.length} SVG files`);

  // Ensure output directory exists
  if (!fs.existsSync(ICONS_OUTPUT_DIR)) {
    fs.mkdirSync(ICONS_OUTPUT_DIR, { recursive: true });
  }

  const iconNames: string[] = [];
  let successCount = 0;
  let errorCount = 0;

  // Process each SVG file
  for (const svgFile of svgFiles) {
    const iconName = svgFile.replace('.svg', '');
    const pascalName = toPascalCase(iconName);
    const svgPath = path.join(svgFolderPath, svgFile);
    const outputPath = path.join(ICONS_OUTPUT_DIR, `${iconName}.tsx`);

    try {
      const svgContent = fs.readFileSync(svgPath, 'utf-8');
      const componentCode = svgToReactComponent(svgContent, pascalName);

      fs.writeFileSync(outputPath, componentCode);
      iconNames.push(iconName);
      successCount++;

      // Progress indicator
      if (successCount % 100 === 0) {
        console.log(`Processed ${successCount}/${svgFiles.length} icons...`);
      }
    } catch (error) {
      console.error(`Error processing ${svgFile}:`, error);
      errorCount++;
    }
  }

  // Generate index.ts
  const indexContent = generateIndexFile(iconNames);
  fs.writeFileSync(path.join(ICONS_OUTPUT_DIR, 'index.ts'), indexContent);

  console.log('\n✅ Icon generation complete!');
  console.log(`   Successfully generated: ${successCount} icons`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Output directory: ${ICONS_OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Run: npm run lint');
}

main().catch(console.error);
