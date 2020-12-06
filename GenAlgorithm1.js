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

    genotypicОutbreeding() {
        let lostIndivids = this.personRef;
        let rodArr = [];
        console.log('Сформируем родительские пары особей, с использованием генотипного аутбридинга');
        console.log('Вычисляем Хеммингового расстояния между первой и второй особью.');
        let hammingDistanceArray = []
        let differentSumIndiv1 = 0;

        for (let i = 1; i < this.N; i++) {
            for (let j = 0; j < this.l; j++) {
                differentSumIndiv1 += Math.abs(this.personRef.x1[0][j] - this.personRef.x1[i][j]) + Math.abs(this.personRef.x2[0][j] - this.personRef.x2[i][j]);
            }
            hammingDistanceArray.push(differentSumIndiv1);
            differentSumIndiv1 = 0;
        }

        let maxhr = {
            idx: 0,
            hr: 0
        };

        let idxs = [2, 3, 4, 5, 6]
        hammingDistanceArray.map((item, i) => {
            console.log('Хеммингово расстояние для ', i + 2, 'особи: ', item);
            if (item > maxhr.hr) {
                maxhr.hr = item;
                maxhr.idx = i;
            } else {
                maxhr.hr = maxhr.hr;
            }
        })
        hammingDistanceArray = []
        console.log('Максимальное значение Хеммингово расстояния: ', maxhr.hr, 'Особь: ', maxhr.idx + 2);

        console.log('Создаем пару состоящую из 1 особи и ', maxhr.idx + 2);
        rodArr.push(
            {
                individNumber: 1,
                chromosome1: this.personRef.x1[0],
                chromosome2: this.personRef.x2[0]
            },
            {
                individNumber: maxhr.idx + 2,
                chromosome1: this.personRef.x1[maxhr.idx + 1],
                chromosome2: this.personRef.x2[maxhr.idx + 1],
            },
        )

        idxs.splice(maxhr.idx, 1)
        lostIndivids.x1.splice(0, 1)
        lostIndivids.x2.splice(0, 1)

        lostIndivids.x1.splice(maxhr.idx, 1)
        lostIndivids.x2.splice(maxhr.idx, 1)

        //Удалили первую пару из массива
        console.log('Далее вычисляем расстояние между особью №', idxs[0], ' и оставшимися без пары особями.');
        for (let i = 1; i < this.N - 2; i++) {
            for (let j = 0; j < this.l; j++) {
                differentSumIndiv1 += Math.abs(lostIndivids.x1[0][j] - lostIndivids.x1[i][j]) + Math.abs(lostIndivids.x2[0][j] - lostIndivids.x2[i][j]);
            }
            hammingDistanceArray.push({ hr: differentSumIndiv1, idx: idxs[i] });
            differentSumIndiv1 = 0;
        }

        maxhr = {
            idx: 0,
            hr: 0
        };
        hammingDistanceArray.map((item) => {
            console.log('Хеммингово расстояние для ', item.idx, 'особи: ', item.hr);
            if (item.hr > maxhr.hr) {
                maxhr.hr = item.hr;
                maxhr.idx = item.idx;
            } else {
                maxhr.hr = maxhr.hr;
            }
        })
        hammingDistanceArray = []
        console.log('Максимальное значение Хеммингово расстояния: ', maxhr.hr, 'Особь: ', maxhr.idx);

        console.log('Создаем пару состоящую из ', idxs[0], 'особи и ', maxhr.idx);
        rodArr.push(
            {
                individNumber: idxs[0],
                chromosome1: lostIndivids.x1[0],
                chromosome2: lostIndivids.x2[0]
            },
            {
                individNumber: maxhr.idx,
                chromosome1: lostIndivids.x1[1],
                chromosome2: lostIndivids.x2[1]
            },
        )
        idxs.splice(0, 1)
        let indexofReqNum = idxs.indexOf(maxhr.idx)
        idxs.splice(indexofReqNum, 1)
        lostIndivids.x1.splice(0, 1)
        lostIndivids.x2.splice(0, 1)

        lostIndivids.x1.splice(indexofReqNum, 1)
        lostIndivids.x2.splice(indexofReqNum, 1)

        rodArr.push(
            {
                individNumber: idxs[0],
                chromosome1: lostIndivids.x1[0],
                chromosome2: lostIndivids.x2[0]
            },
            {
                individNumber: idxs[1],
                chromosome1: lostIndivids.x1[1],
                chromosome2: lostIndivids.x2[1],
            },
        )
        console.log('Создаем последнюю пару из оставшихся особей ', idxs[0], ' и ', idxs[1]);
        console.log('№ | генот. хром x1  | генотип хромосомы x2');
        rodArr.map((item) => {
            console.log(item.individNumber, '|', item.chromosome1.join(' '), '|', item.chromosome2.join(' '));
        })

        rodArr.map((item, i) => {
            item.individNumber = i + 1;
        })
        this.personRef = rodArr;
        this.population.push(rodArr)
    }

    homogeneousСrossingover() {
        console.log('Выполняем скрещивание однородным оператором');
        let newRod = [];

        const chromosomeMask = [];

        let displayCounter = 7;
        for (let i = 0; i < this.N; i += 2) {
            for (let k = 0; k < this.l; k++) {
                chromosomeMask[k] = getRandomInt(2);
            }
            console.log('Хромосома-маска: ', chromosomeMask.join(' '));
            
            let individ1Chromosome1 = [];
            let individ1Chromosome2 = [];

            let individ2Chromosome1 = [];
            let individ2Chromosome2 = [];
            for (let j = 0; j < this.l; j++) {
                if (chromosomeMask[j] === 0) {
                    individ1Chromosome1.push(this.personRef[i].chromosome1[j]);
                    individ1Chromosome2.push(this.personRef[i].chromosome2[j]);
                    individ2Chromosome1.push(this.personRef[i + 1].chromosome1[j])
                    individ2Chromosome2.push(this.personRef[i + 1].chromosome2[j])
                } else {
                    individ1Chromosome1.push(this.personRef[i + 1].chromosome1[j])
                    individ1Chromosome2.push(this.personRef[i + 1].chromosome1[j])
                    individ2Chromosome1.push(this.personRef[i].chromosome1[j])
                    individ2Chromosome2.push(this.personRef[i].chromosome1[j])
                }
            }

            let num1 = displayCounter++;
            let num2 = displayCounter++;

            newRod.push(
                {
                    individNumber: num1,
                    chromosome1: individ1Chromosome1,
                    chromosome2: individ1Chromosome2
                },
                {
                    individNumber: num2,
                    chromosome1: individ2Chromosome1,
                    chromosome2: individ2Chromosome2
                }
            );
        }

        console.log('№пары | № | Генотип хром. x1 | Генотип хром. x2 |');
        let counterPair = 1;
        newRod.map((item, i) => {
            console.log(`${(i - 1) % 2 ? (counterPair++ + '     |') : '______|'}`, item.individNumber, '|', item.chromosome1.join(' '), ' | ', item.chromosome2.join(' '));
        })
        this.personRef = newRod;
        this.population.push(newRod);
    }

    twoPointInversion() {
        console.log('Выполним мутацию 2х точечной инверсией');

        let rodArr = [];
        this.personRef.map((item) => {
            rodArr.push({
                childNum: item.individNumber,
                individNumber: item.individNumber + 6,
                chromosome1: inversionArray(item.chromosome1, this.l),
                chromosome2: inversionArray(item.chromosome2, this.l)

            })
        })

        console.log('№ос-пот. | №ос-мут | Генотип хром. x1 | Генотип хром. x2 |');
        rodArr.map((item) => {
            console.log(item.childNum, '       | ', item.individNumber, '    |', item.chromosome1.join(' '), ' | ', item.chromosome2.join(' '), '|');
        })
        this.population.push(rodArr);
    }

    decoder() {
        console.log('№ос|ДесЗначДвКХр№1|ДесЗначДвКХр№2|ЗначПрFx1|ЗначПрFx2|ЗнчF(x1,x2)')
        const data = [];

        this.population.map((item) => {
            item.map((individ) => {
                let parseX1 = parseInt(individ.chromosome1.join(''), 2);
                let parseX2 = parseInt(individ.chromosome2.join(''), 2);

                let x1 = ((Math.abs(this.b - this.a)) / (Math.pow(2, 8) - 1)) * parseX1 + this.a;
                let x2 = ((Math.abs(this.b - this.a)) / (Math.pow(2, 8) - 1)) * parseX2 + this.a;

                data.push({
                    id: individ.individNumber,
                    chrome1: individ.chromosome1.join(''),
                    chrome2: individ.chromosome2.join(''),
                    chromeValue1: parseX1,
                    chromeValue2: parseX2,
                    x1,
                    x2,
                })
            })
        })

        data.map((item) => {
            const alfa = Math.PI / 2;
            const A = item.x1 * Math.cos(alfa) - item.x2 * Math.sin(alfa);
            const B = item.x1 * Math.sin(alfa) + item.x2 * Math.cos(alfa);
            const Kx = 1.5;
            const Ky = 0.8;

            item.funcValue = funcTask(Kx, A, Ky, B);
        })

        data.map((item) => {
            let resultDisplay = '';

            resultDisplay += `${item.id}| ${item.chromeValue1} | ${item.chromeValue2} | ${item.x1} | ${item.x2} | ${item.funcValue}`
            console.log(resultDisplay);
        })
        this.population = data;
    }

    selection() {
        console.log('Выполним отбор 6 лучших особей в следующее поколение эволюции, с использованием оператора турнирной селекции.');
        console.log('№Группы|№Особи|ЗначФункцииf(x)     |№Наил.особиВгруппе');
        let counter = 1;
        let size = 3;
        let subarray = [];

        for (let i = 0; i < Math.ceil(this.population.length / size); i++) {
            subarray[i] = this.population.slice((i * size), (i * size) + size);
        }
        subarray.map(item => {
            item.sort((a, b) => a.funcValue - b.funcValue);
        });

        subarray.map((individ) => {
            this.population.map((item) => {
                if (individ[0].id === item.id) {
                    item.isMaxFuncValue = true;
                }
            })
        })

        this.population.map((item, i, array) => {
            let bestElem = null;
            bestElem = item.funcValue;
            if (item.funcValue > bestElem && i % 3 !== 0) {
                bestElem = item.funcValue;
            } else {
                bestElem = ''
            }
            let selectionDisplay = `${i % 3 ? ' ' : counter}      | ${item.id > 9 ? item.id + '   ' : item.id + '    '}| ${item.funcValue} | ${item.isMaxFuncValue ? item.id : ''}`;
            if (i % 3 == 0) {
                counter++;
            }
            console.log(selectionDisplay);
        })

        let next_population = [];
        this.population.map((item) => {
            item.isMaxFuncValue ? next_population.push(item.id) : '';
        })

        console.log('Таким образом, в следующее поколение выбираются особи: ', next_population.join(', '));
    }

    main() {
        this.createInitialPopulation();
        this.genotypicОutbreeding();
        this.homogeneousСrossingover()
        this.twoPointInversion()
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

function inversionArray(paramArray, paramArrayLength) {
    let randomPoint1 = getRandomInt(8);
    let randomPoint2 = getRandomInt(8);

    while ((randomPoint2 === randomPoint1 || Math.abs(randomPoint1 - randomPoint2) === 1) || randomPoint1 > randomPoint2) {
        randomPoint1 = getRandomInt(8);
        randomPoint2 = getRandomInt(8);
    }

    console.log('Первая точка: ', randomPoint1, 'Вторая точка: ', randomPoint2);
    let resDisplay = paramArray.slice(0, randomPoint1).join(' ') + '|' + paramArray.slice(randomPoint1, randomPoint2 + 1).join(' ') + '|' + paramArray.slice(randomPoint2 + 1, paramArrayLength).join(' ') + '  ->  ';

    let resultArray = [];
    for (let j = 0; j < randomPoint1; j++) {
        resDisplay += paramArray[j] + ' ';
        resultArray.push(paramArray[j]);
    }
    for (let j = randomPoint2; j > randomPoint1 - 1; j--) {
        resDisplay += paramArray[j] + ' ';
        resultArray.push(paramArray[j]);
    }
    for (let j = randomPoint2 + 1; j < paramArrayLength; j++) {
        resDisplay += paramArray[j] + ' ';
        resultArray.push(paramArray[j]);
    }
    console.log(resDisplay);
    console.log();
    return resultArray;
}

module.exports = GA;