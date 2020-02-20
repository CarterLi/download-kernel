"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
void async function main() {
    const dom = await jsdom_1.JSDOM.fromURL('https://kernel.ubuntu.com/~kernel-ppa/mainline/daily/current/');
    const { document } = dom.window;
    console.log(document.querySelector('h1').textContent, '\n');
    const files = [];
    let a = dom.window.document.querySelector('a[href="BUILD.LOG.amd64"]');
    while (!(a = a.nextElementSibling).matches('a[href="BUILD.LOG.arm64"]')) {
        if (/[^a-z](all|generic)[^a-z]/.test(a.textContent)) {
            files.push(a.href);
        }
    }
    console.log(`wget ${files.join(' ')}`);
}().catch(console.error.bind(console));
//# sourceMappingURL=index.js.map