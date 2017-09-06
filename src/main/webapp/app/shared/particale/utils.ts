export function getRandomNumByRange(range: number): number {
    const random = Math.random();
    return random * 10 % range;
}


export function setStyles(target: HTMLElement, styles) {
    for (const property in styles) {
        if (styles.hasOwnProperty(property)){
            target.style[property] = styles[property];
        }

    }
}
