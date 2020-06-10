import { JSDOM } from 'jsdom';

void async function main() {
  const dom = await JSDOM.fromURL('https://kernel.ubuntu.com/~kernel-ppa/mainline/daily/current/');
  const { document } = dom.window;
  console.log(document.querySelector('h1').textContent, '\n');
  const files: string[] = [];
  let a: HTMLAnchorElement = dom.window.document.querySelector('a[href="amd64/log"]');
  while (!(a = a.nextElementSibling as HTMLAnchorElement).matches('a[href="amd64/self-tests/log"]')) {
    if (/[^a-z](all|generic)[^a-z]/.test(a.textContent)) {
      files.push(a.href);
    }
  }
  console.log(`wget ${files.join(' ')}`);
}().catch(console.error.bind(console));
