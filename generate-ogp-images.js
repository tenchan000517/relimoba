// generate-ogp-images.js
// このスクリプトはNPM packageの"sharp"を使用してOGP画像を生成します
// 使用前にインストール: npm install sharp

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 設定
const config = {
  inputLogo: path.join(__dirname, 'public/images/mainlogo.jpeg'),
  outputDir: path.join(__dirname, 'public/images/og'),
  sizes: {
    facebook: { width: 1200, height: 630 },
    twitter: { width: 1200, height: 675 },
    line: { width: 1200, height: 630 },
    discord: { width: 1200, height: 630 },
    default: { width: 1200, height: 630 },
  },
  backgroundColor: '#000000', // 背景色を黒に変更
  padding: 40, // パディング
  text: 'レリモバ - トークンがもらえる格安モバイル', // 追加テキスト
};

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// 各サイズのOGP画像を生成
async function generateOGPImages() {
  try {
    const logoBuffer = await sharp(config.inputLogo)
      .resize({ width: 600, height: 600, fit: 'inside' })
      .toBuffer();

    // 各プラットフォーム用の画像を生成
    for (const [platform, size] of Object.entries(config.sizes)) {
      console.log(`Generating OGP image for ${platform}...`);
      
      await sharp({
        create: {
          width: size.width,
          height: size.height,
          channels: 4,
          background: config.backgroundColor,
        }
      })
        .composite([
          {
            input: logoBuffer,
            gravity: 'center',
          },
        ])
        .jpeg({ quality: 90 })
        .toFile(path.join(config.outputDir, `og-${platform}.jpg`));
      
      console.log(`Created OGP image for ${platform}`);
    }

    console.log('All OGP images generated successfully!');
  } catch (error) {
    console.error('Error generating OGP images:', error);
  }
}

generateOGPImages();