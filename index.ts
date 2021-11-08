import { JSDOM } from 'jsdom';

void async function main(version?: string) {
  if (version === 'help') {
    console.info(`Usage: npm start [version]`);
    return;
  }

  const arch = {
    arm: 'armhf',
    arm64: 'arm64',
    x32: 'i386',
    x64: 'amd64',
    ppc64: 'ppc64el',
    s390x: 's390x',
  }[process.arch];

  if (!arch) throw new Error('Unknown arch: ' + process.arch);

  const dom = await JSDOM.fromURL(`https://kernel.ubuntu.com/~kernel-ppa/mainline/${/^v\d+\.\d+/.test(version) ? encodeURIComponent(version) : 'daily/current'}/`);
  const { document } = dom.window;
  console.info(document.querySelector('h1').textContent, '-', arch, '\n');
  const code: HTMLElement = document.querySelector('code');
  const files = [
    (code.querySelector('a[href$="_all.deb"]') as HTMLAnchorElement).href,
    ...[...code.querySelectorAll(`a[href^="${arch}/linux-"]`)].filter((a: HTMLAnchorElement) => a.textContent.includes('-generic_')),
  ];

  console.log(`wget ${files.join(' \\\n')}`);
}(process.argv[process.argv.length - 1]).catch(console.error);
