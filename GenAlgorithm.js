const Person = require('./Person');

class GA {
    l = 8;
    N = 6;
    p_cross;
    p_mut;
    personRef;

    constructor(params) {
        const person = new Person();
        this.personRef = person;
    }

    createInitialPopulation() {
        let rodArrx1 = [];
        let rodArrx2 = [];

        for (let i = 0; i < this.N; i++) {
            rodArrx1[i] = [];
            rodArrx2[i] = [];
            for (let j = 0; j < this.l; j++) {
                rodArrx1[i][j] = getRandomInt(2);
                rodArrx2[i][j] = getRandomInt(2);
            }
        }

        console.log('Начальная популяция:');
        console.log('№|Генотип хромосомы№1|Генотип хромосомы№2');
        for (let i = 0; i < 6; i++) {
            let x1 = i + 1 + '| ';
            let x2 = '  | ';
            for (let j = 0; j < 8; j++) {
                x1 += `${rodArrx1[i][j]} `
                x2 += `${rodArrx2[i][j]} `
            }
            console.log(x1 + x2);
        }
        this.personRef.x1 = rodArrx1;
        this.personRef.x2 = rodArrx2;
    }

    panmection() {
        let somearr = [];
        for (let i = 0; i < this.N; i++) {
            let ind = getRandomInt(this.N);

            if (!somearr.includes(ind)) {
                somearr.push(ind);
            } else {
                i--;
            }
        }

        let rodArrx1 = [];
        let rodArrx2 = [];

        for (let i = 0; i < this.N; i++) {
            rodArrx1[i] = [];
            rodArrx2[i] = [];
        }

        for (let i = 0; i < this.N; i++) {
            let idx = somearr[i]
            rodArrx1[i] = this.personRef.x1[idx]
            rodArrx2[i] = this.personRef.x2[idx]
        }

        console.log('Сформируем родительские пары особей, с использованием оператора панмиксии');
        console.log('№РодПары|№РодОс|Генотип хромосомы№1|Генотип хромосомы№2');
        let num = 1;
        for (let i = 0; i < this.N; i++) {
            let x1;
            let x2 = '  | ';
            if (i % 2 == 0) {
                x1 = num + '       | '
                num++;
            } else {
                x1 = '________| '
            }
            x1 += (somearr[i] + 1) + '    | ';

            for (let j = 0; j < this.l; j++) {
                x1 += `${rodArrx1[i][j]} `
                x2 += `${rodArrx2[i][j]} `
            }
            console.log(x1 + x2);
        }

        this.personRef.x1 = rodArrx1;
        this.personRef.x2 = rodArrx2;
    }


    crossingover() {
        let rodArrx1 = this.personRef.x1;
        let rodArrx2 = this.personRef.x2;

        for (let i = 0; i < this.N; i += 2) {
            for (let j = 4; j < this.l; j++) {
                const tmp = rodArrx1[i][j];
                rodArrx1[i][j] = rodArrx1[i + 1][j];
                rodArrx1[i + 1][j] = tmp;

                const tmp1 = rodArrx2[i][j];
                rodArrx2[i][j] = rodArrx2[i + 1][j];
                rodArrx2[i + 1][j] = tmp1;
            }
        }
        console.log('Выполним скрещивание родительских пар и образуем особей-потомков, с использованием оператора простого одноточечного кроссинговера. Точка кроссинговера располагается между 4-ым и 5-ым генами хромосомы. Вероятность скрещивания равна 1.');
        console.log('№РодПары|№ОсПот|Генотип хромосомы№1 |Генотип хромосомы№2');

        let num = 1;
        let offInd = 7;
        for (let i = 0; i < this.N; i++) {
            let x1;
            let x2 = '  | ';
            if (i % 2 == 0) {
                x1 = num + '       | '
                num++;
            } else {
                x1 = '________| '
            }
            if (offInd > 9) {
                x1 += offInd + '   | ';
            } else {
                x1 += offInd + '    | ';
            }

            for (let j = 0; j < this.l; j++) {
                if (j === 4) {
                    x1 += '.'
                    x2 += '.'
                }
                x1 += `${rodArrx1[i][j]} `
                x2 += `${rodArrx2[i][j]} `
            }
            console.log(x1 + x2);
            offInd++;
        }
        this.personRef.x1 = rodArrx1;
        this.personRef.x2 = rodArrx2;
        // console.log(this.personRef);
    }

    mutation() {
        let rodArrx1 = this.personRef.x1;
        let rodArrx2 = this.personRef.x2;

        for (let i = 0; i < this.N; i++) {
            const idx = getRandomInt(8);
            if (rodArrx1[i][idx] === 0 ) {
                rodArrx1[i][idx] = 1;
            } else {
                rodArrx1[i][idx] = 0
            }

            if (rodArrx2[i][idx] === 0 ) {
                rodArrx2[i][idx] = 1;
            } else {
                rodArrx2[i][idx] = 0
            }
        }

        console.log('Произведем мутацию хромосом особей потомков, с использованием оператора простой одноточечной мутации. Точка мутации определяется случайным образом. Вероятность мутации равна 1.');
        console.log('№ОсПот|№ОсМут|Генотип хромосомы№1 |Генотип хромосомы№2');

        let offInd = 7;
        for (let i = 0; i < this.N; i++) {
            let x1;
            let x2 = '  | ';
            if (offInd > 9) {
                x1 = offInd + '    | '
            } else {
                x1 = offInd + '     | '
            }
            x1 += (offInd + 6) + '   | ';

            for (let j = 0; j < this.l; j++) {
                x1 += `${rodArrx1[i][j]} `
                x2 += `${rodArrx2[i][j]} `
            }
            console.log(x1 + x2);
            offInd++;
        }

        this.personRef.x1 = rodArrx1;
        this.personRef.x2 = rodArrx2;
    }

    decoder() {

    }

    selection() {

    }

    main() {

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = GA;