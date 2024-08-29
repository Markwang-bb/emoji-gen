#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';

const emojis = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  surprised: '😲',
  love: '😍',
  laugh: '😂',
  cool: '😎',
  wink: '😉',
  cry: '😭',
  think: '🤔',
  sleepy: '😴',
  sick: '🤒',
  devil: '😈',
  alien: '👽',
  clap: '👏',
  fire: '🔥',
  rainbow: '🌈',
  star: '⭐',
  heart: '❤️',
  poop: '💩'
};

function getRandomEmoji() {
  const keys = Object.keys(emojis);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return emojis[randomKey];
}

program
  .version('1.0.0')
  .description('终端版表情包生成工具')
  .option('-e, --emotion <type>', '选择情绪类型')
  .option('-t, --text <text...>', '添加文字')
  .option('-a, --all', '生成所有 emoji')
  .option('-r, --random', '生成随机表情')
  .addHelpText('after', `

示例:
  $ emoji-gen -e happy -t 今天 真 开心
  $ emoji-gen -e sad -t 下雨了
  $ emoji-gen -e love -t 我 爱 编程
  $ emoji-gen -a

可用的情绪类型:
  happy     - 😊    sad       - 😢    angry     - 😠
  surprised - 😲    love      - 😍    laugh     - 😂
  cool      - 😎    wink      - 😉    cry       - 😭
  think     - 🤔    sleepy    - 😴    sick      - 🤒
  devil     - 😈    alien     - 👽    clap      - 👏
  fire      - 🔥    rainbow   - 🌈    star      - ⭐
  heart     - ❤️    poop      - 💩
`)
  .parse(process.argv);

  const options = program.opts();

  if (options.all) {
    console.log(chalk.yellow('所有 emoji：\n' + generateAllEmojis()));
  } else if (options.random) {
    const randomEmoji = getRandomEmoji();
    const text = options.text ? options.text.join(' ') : '';
    console.log(chalk.yellow(`${randomEmoji} ${text}`));
  } else if (options.emotion && emojis[options.emotion]) {
    const emoji = emojis[options.emotion];
    const text = options.text ? options.text.join(' ') : '';
    console.log(chalk.yellow(`${emoji} ${text}`));
  } else if (!options.emotion && !options.text) {
    program.help();
  } else {
    console.log(chalk.red('请选择有效的情绪类型，或使用 -r 选项生成随机表情'));
  }
