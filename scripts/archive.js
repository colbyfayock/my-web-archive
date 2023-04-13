import * as dotenv from 'dotenv';
import { promises as fs } from 'fs';
import { chromium } from 'playwright';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const url = 'https://spacejelly.dev';
const date = new Date(Date.now());

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(url);

const screenshotPath = `screenshots/${date.toISOString()}.png`;

await page.screenshot({
  path: screenshotPath,
  fullPage: true
})

await browser.close();

const results = await cloudinary.uploader.upload(screenshotPath, {
  folder: 'my-web-archive'
});

const archive = {
  url,
  date,
  image: {
    url: results.secure_url,
    width: results.width,
    height: results.height
  }
}

await fs.writeFile(`./archives/${date.toISOString()}.json`, JSON.stringify(archive, null, 2))