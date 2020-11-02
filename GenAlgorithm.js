const Person = require('./Person');
const Task = require('./Task');

class GA {
    l = 8;
    N = 6;
    p_cross;
    p_mut;
    personRef;
    population = [];
    a;
    b;
    constructor() {
        const person = new Person();
        const task = new Task(-16, 16);
        this.a = task.a;
        this.b = task.b;
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
        for (let i = 0; i < this.N; i++) {
            let x1 = i + 1 + '| ';
            let x2 = '  | ';
            for (let j = 0; j < this.l; j++) {
                x1 += `${rodArrx1[i][j]} `
                x2 += `${rodArrx2[i][j]} `
            }
            console.log(x1 + x2);
        }
        this.personRef.x1 = rodArrx1;
        this.personRef.x2 = rodArrx2;
    }

    panmection() {
        let indArray = [];
        for (let i = 0; i < this.N; i++) {
            let ind = getRandomInt(this.N);

            if (!indArray.includes(ind)) {
                indArray.push(ind);
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
            let idx = indArray[i]
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
            x1 += (indArray[i] + 1) + '    | ';

            for (let j = 0; j < this.l; j++) {
                x1 += `${rodArrx1[i][j]} `
                x2 += `${rodArrx2[i][j]} `
            }
            console.log(x1 + x2);
        }

        this.personRef.x1 = rodArrx1;
        this.personRef.x2 = rodArrx2;
        this.population.push(rodArrx1);
        this.population.push(rodArrx2);
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
        this.population.push(rodArrx1);
        this.population.push(rodArrx2);

    }

    mutation() {
        let rodArrx1 = this.personRef.x1;
        let rodArrx2 = this.personRef.x2;

        for (let i = 0; i < this.N; i++) {
            const idx = getRandomInt(8);
            if (rodArrx1[i][idx] === 0) {
                rodArrx1[i][idx] = 1;
            } else {
                rodArrx1[i][idx] = 0
            }

            if (rodArrx2[i][idx] === 0) {
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

        this.population.push(rodArrx1);
        this.population.push(rodArrx2);
    }

    decoder() {
        console.log('№ос|ДесЗначДвКХр№1|ДесЗначДвКХр№2|ЗначПрFx1|ЗначПрFx2|ЗнчF(x1,x2)')

        const data = [];
        let counter = 1;
        for (let i = 0; i < 6; i += 2) {
            let chrome1 = '';
            let chrome2 = '';
            for (let j = 0; j < this.N; j++) {
                for (let k = 0; k < this.l; k++) {
                    chrome1 += this.population[i][j][k];
                    chrome2 += this.population[i + 1][j][k];
                }
                let parseX1 = parseInt(chrome1, 2);
                let parseX2 = parseInt(chrome2, 2);

                let x1 = ((Math.abs(this.b - this.a)) / (Math.pow(2, 8) - 1)) * parseX1 + this.a;
                let x2 = ((Math.abs(this.b - this.a)) / (Math.pow(2, 8) - 1)) * parseX2 + this.a;

                data.push({
                    id: counter,
                    chrome1: chrome1,
                    chrome2: chrome2,
                    chromeValue1: parseX1,
                    chromeValue2: parseX2,
                    x1,
                    x2,
                })
                counter += 1;
                chrome1 = '';
                chrome2 = '';
            }
        }

        data.map((item) => {
            const alfa = Math.PI / 2;
            const A = item.x1 * Math.cos(alfa) - item.x2 * Math.sin(alfa);
            const B = item.x1 * Math.sin(alfa) + item.x2 * Math.cos(alfa);
            const Kx = 1.5;
            const Ky = 0.8;

            item.funcValue = funcTask(Kx, A, Ky, B);
        })

        data.sort((a, b) => a.funcValue - b.funcValue);

        data.map((item) => {
            let resultDisplay = '';

            resultDisplay += `${item.id}| ${item.chromeValue1} | ${item.chromeValue2} | ${item.x1} | ${item.x2} | ${item.funcValue}`
            console.log(resultDisplay);
        })
        this.population = data;
    }

    selection() {
        console.log('Выполним отбор 6 лучших особей в следующее поколение эволюции, с использованием оператора элитной селекции');

        console.log('№ЛучшОс|Генотип хромосомы№1 |Генотип хромосомы№2|F(x,y)');
        this.population.map((item, i) => {
            let selectionDisplay = '';
            if (i < 6) {
                selectionDisplay += `${item.id} | ${item.chrome1}      | ${item.chrome2}     | ${item.funcValue}`
            } else {
                return;
            }
            console.log(selectionDisplay);
        })
    }

    main() {
        this.createInitialPopulation();
        this.panmection();
        this.crossingover();
        this.mutation();
        this.decoder();
        this.selection();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function funcTask(Kx, A, Ky, B) {
    return Math.pow((0.1 * Kx * A), 2) + Math.pow((0.1 * Ky * B), 2) - 4 * Math.cos(0.8 * Kx * A) - 4 * Math.cos(0.8 * Ky * B) + 8;
}

module.exports = GA;