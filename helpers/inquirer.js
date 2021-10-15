const inquirer = require('inquirer');
require('colors');

const questions = [{
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [{
            value: 1,
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.green} Historial`
        },
        {
            value: 0,
            name: 'Salir'
        }
    ]
}];



const inquirerMenu = async() => {
    console.clear();
    console.log('============================'.green);
    console.log('Seleccione una opcion'.white);
    console.log('============================\n'.green);
    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {
    const questionExit = [{
        type: 'input',
        name: 'exit',
        message: `\n Presione ${'ENTER'.green} para continuar`,
    }];
    await inquirer.prompt(questionExit);
}

const loadInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return "ingrese un valor"
            }
            return true;
        }
    }];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async(places = []) => {
    const choices = places.map((place, i) => {
        const indice = `${i+1}. `.green;
        return {
            value: place.id,
            name: `${indice} ${place.name}`
        }
    })

    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancelar'
    })
    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar',
        choices
    }];
    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const loadChoresEarring = async(chores = []) => {
    const choices = chores.map((homework, i) => {
        const indice = `${i+1}. `.green;
        return {
            value: homework.id,
            name: `${indice} ${homework.desc}`,
            checked: (homework.complete) ? true : false
        }
    })

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }];
    const { ids } = await inquirer.prompt(questions);
    return ids;
}


module.exports = {
    inquirerMenu,
    pause,
    loadInput,
    listPlaces,
    confirm,
    loadChoresEarring
}