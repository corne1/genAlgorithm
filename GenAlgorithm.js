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
            this.personRef.x1[i] = [];
            this.personRef.x2[i] = [];
            rodArrx1[i] = [];
            rodArrx2[i] = [];
            for (let j = 0; j < this.l; j++) {
                this.personRef.x1[i][j] = getRandomInt(2);
                this.personRef.x2[i][j] = getRandomInt(2);
            }
        }

        console.log('Начальная популяция:');
        console.log('№|Генотип хромосомы№1|Генотип хромосомы№2');
        for (let i = 0; i < 6; i++) {
            let x1 = i + 1 + '| ';
            let x2 = '  | ';
            for (let j = 0; j < 8; j++) {
                x1 += `${this.personRef.x1[i][j]} `
                x2 += `${this.personRef.x2[i][j]} `
            }
            console.log(x1 + x2);
        }
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
        for (let i = 0; i < 6; i++) {
            let x1;
            let x2 = '  | ';
            if (i % 2 == 0) {
                x1 = num + '       | '
                num++;
            } else {
                x1 = '________| '
            }
            x1 += (somearr[i] + 1) + '    | ';

            for (let j = 0; j < 8; j++) {
                x1 += `${rodArrx1[i][j]} `
                x2 += `${rodArrx2[i][j]} `
            }
            console.log(x1 + x2);
        }
    }


    crossingover() {
        console.log('Выполним скрещивание родительских пар и образуем особей-потомков, с использованием оператора простого одноточечного кроссинговера. Точка кроссинговера располагается между 4-ым и 5-ым генами хромосомы. Вероятность скрещивания равна 1.');

        console.log(this.personRef);
    }

    mutation() {

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