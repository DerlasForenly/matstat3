for (let k = 0; k < document.getElementsByTagName('input').length; k++) {
    document.getElementsByTagName('input')[k].onclick = () => {
        let size_A = parseInt(document.getElementById('size_A').value)
        let size_B = parseInt(document.getElementById('size_B').value)

        deleteChilds(document.getElementById('main_table'))

        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.textContent = 'Рівень фактора B'
        td.setAttribute('rowspan', '3')
        tr.appendChild(td)
        td = document.createElement('td')
        td.textContent = 'Рівень фактора A'
        td.setAttribute('colspan', 2 * size_A)
        tr.appendChild(td)
        td = document.createElement('td')
        td.textContent = 'Середня величина за рядками'
        td.setAttribute('rowspan', '3')
        tr.appendChild(td)
        td = document.createElement('td')
        td.textContent = 'Загальна середня величина'
        td.setAttribute('rowspan', '3')
        tr.appendChild(td)
        document.getElementById('main_table').appendChild(tr)

        tr = document.createElement('tr')
        for (let j = 0; j < parseInt(document.getElementById('size_A').value); j++) {
            let td = document.createElement('td')
            td.setAttribute('colspan', 2)
            td.innerHTML = `A<sub>${j + 1}</sub>`
            tr.appendChild(td)
        }
        document.getElementById('main_table').appendChild(tr)

        tr = document.createElement('tr')
        for (let i = 0; i < size_A * 2; i++) {
            td = document.createElement('td')
            if (i % 2 == 0) {
                td.textContent = '-'
            }
            else {
                td.textContent = 'Блочна середня'
            }
            tr.appendChild(td)
        }
        document.getElementById('main_table').appendChild(tr)

        for (let i = 0; i < size_B; i++) {
            tr = document.createElement('tr')

            td = document.createElement('td')
            td.innerHTML = `B<sub>${i + 1}</sub>` 
            tr.appendChild(td)

            for (let j = 0; j < size_A * 2; j++) {
                td = document.createElement('td')
                if (j % 2 == 0) {
                    td.innerHTML = `<textarea id="A${j / 2 + 1}B${i + 1}"></textarea>`
                    td.setAttribute('class', 'input_td')
                }
                else {
                    td.innerHTML = `?`
                    td.setAttribute('class', 'block_mean')
                }
                tr.appendChild(td)
            }

            td = document.createElement('td')
            td.textContent = `?` 
            td.setAttribute('class', 'row_mean')
            tr.appendChild(td)

            if (i == 0) {
                td = document.createElement('td')
                td.textContent = '?'
                td.setAttribute('id', 'general_mean')
                td.setAttribute('rowspan', size_B + 1)
                tr.appendChild(td)
            }

            document.getElementById('main_table').appendChild(tr)
        }

        tr = document.createElement('tr')
        td = document.createElement('td')
        td.textContent = 'Середня величина за стовпцями'
        tr.appendChild(td)
        for (let i = 0; i < size_A; i++) {
            td = document.createElement('td')
            td.textContent = '?'
            td.setAttribute('class', 'col_mean')
            td.setAttribute('colspan', 2)
            tr.appendChild(td)
        }
        td = document.createElement('td')
        td.textContent = '-'
        tr.appendChild(td)
        document.getElementById('main_table').appendChild(tr)

        let table_2 = [
            `\
            <td colspan="1">Джерело, що спонукає до розсіювання</td>\
            <td colspan="${size_A}">Сума квадратів відхилень</td>\
            <td colspan="${size_A}">Число ступенів свободи</td>\
            <td colspan="2">Статистичні оцінки дисперсій (виправлені дисперсії)</td>\
            `,
            `\
            <td colspan="1">Фактор A</td>\
            <td colspan="${size_A}" class="Q">?</td>\
            <td colspan="${size_A}" class="power_of_freedom">?</td>\
            <td colspan="2" class="S">?</td>\
            `,
            `\
            <td colspan="1">Фактор B</td>\
            <td colspan="${size_A}" class="Q">?</td>\
            <td colspan="${size_A}" class="power_of_freedom">?</td>\
            <td colspan="2" class="S">?</td>\
            `,
            `\
            <td colspan="1">Одночасна дія факторів A і B</td>\
            <td colspan="${size_A}" class="Q">?</td>\
            <td colspan="${size_A}" class="power_of_freedom">?</td>\
            <td colspan="2" class="S">?</td>\
            `,
            `\
            <td colspan="1">Дія випадкової компоненти ε<sub>ijk</sub></td>\
            <td colspan="${size_A}" class="Q">?</td>\
            <td colspan="${size_A}" class="power_of_freedom">?</td>\
            <td colspan="2" class="S">?</td>\
            `,
            `\
            <td colspan="1">Загальне відхилення</td>\
            <td colspan="${size_A}" class="Q">?</td>\
            <td colspan="${size_A}" class="power_of_freedom">?</td>\
            <td colspan="2" class="S">?</td>\
            `,
            `<td colspan="${2 + 2 + size_A * 2}"><button id="calculate">Calculate</button></td>`
        ]

        for (let i = 0; i < table_2.length; i++) {
            tr = document.createElement('tr')
            tr.innerHTML = table_2[i]
            document.getElementById('main_table').appendChild(tr)
        }
    }
}

function deleteChilds(element) {
    while (element.firstChild) element.removeChild(element.firstChild)
}

document.getElementsByTagName('input')[0].onclick()