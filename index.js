"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
void async function main(version) {
    if (version === 'help') {
        console.info(`Usage: npm start [version]`);
        return;
    }
    const dom = await jsdom_1.JSDOM.fromURL(`https://kernel.ubuntu.com/~kernel-ppa/mainline/${/^v\d+\.\d+/.test(version) ? encodeURIComponent(version) : 'daily/current'}/`);
    const { document } = dom.window;
    console.info(document.querySelector('h1').textContent, '\n');
    const files = [];
    let a = dom.window.document.querySelector('a[href="amd64/log"]');
    while (!(a = a.nextElementSibling).matches('a[href="amd64/self-tests/log"]')) {
        if (/[^a-z](all|generic)[^a-z]/.test(a.textContent)) {
            files.push(a.href);
        }
    }
    console.log(`wget ${files.join(' ')}`);
}(process.argv[process.argv.length - 1]).catch(console.error);
//# sourceMappingURL=index.js.map