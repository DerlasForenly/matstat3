calculate.onclick = () => {
    let factors = []
    for (let i = 0; i < parseInt(document.getElementById('size_B').value); i++) {
        factors.push([])
        for (let j = 0; j < parseInt(document.getElementById('size_A').value); j++)
            factors[i].push(document.getElementById(`A${j + 1}B${i + 1}`).value.split('; '))
    }

    let general_factor = []
    for (let i = 0; i < factors.length; i++)
        for (let j = 0; j < factors[i].length; j++)
            for (let z = 0; z < factors[i][j].length; z++) {
                factors[i][j][z] = parseFloat(factors[i][j][z])
                general_factor.push(factors[i][j][z])
            }

    let block_means = document.getElementsByClassName('block_mean')
    let col_means = document.getElementsByClassName('col_mean')
    let row_means = document.getElementsByClassName('row_mean')
    let powers_of_freedom = document.getElementsByClassName('power_of_freedom')
    let Q = document.getElementsByClassName('Q')
    let S = document.getElementsByClassName('S')

    block_means[0].textContent = calculate_mean(factors[0][0])
    block_means[1].textContent = calculate_mean(factors[0][1])
    block_means[2].textContent = calculate_mean(factors[0][2])
    block_means[3].textContent = calculate_mean(factors[1][0])
    block_means[4].textContent = calculate_mean(factors[1][1])
    block_means[5].textContent = calculate_mean(factors[1][2])
    block_means = from_1d_to_2d(to_normal_mass(block_means), factors[0].length)

    col_means[0].textContent = calculate_mean(factors[0][0].concat(factors[1][0]))
    col_means[1].textContent = calculate_mean(factors[0][1].concat(factors[1][1]))
    col_means[2].textContent = calculate_mean(factors[0][2].concat(factors[1][2]))

    row_means[0].textContent = calculate_mean(
        factors[0][0].concat(
            factors[0][1].concat(
                factors[0][2]
                )
            )
        )
    row_means[1].textContent = calculate_mean(
        factors[1][0].concat(
            factors[1][1].concat(
                factors[1][2]
                )
            )
        )
    
    general_mean.textContent = calculate_mean(general_factor)

    powers_of_freedom[0].textContent = factors[0].length - 1
    powers_of_freedom[1].textContent = factors.length - 1
    powers_of_freedom[2].textContent = (factors[0].length - 1) * (factors.length - 1)
    powers_of_freedom[3].textContent = factors[0][0].length * factors[0].length * factors.length - factors[0].length * factors.length
    powers_of_freedom[4].textContent = factors[0][0].length * factors[0].length * factors.length - 1

    let Q1 = 0
    for (let e of col_means) Q1 += (parseFloat(e.textContent) - parseFloat(general_mean.textContent)) ** 2
    Q1 *= factors[0][0].length * factors.length
    Q[0].textContent = Q1.toFixed(3)

    let Q2 = 0
    for (let e of row_means) Q2 += (parseFloat(e.textContent) - parseFloat(general_mean.textContent)) ** 2
    Q2 *= factors[0][0].length * factors[0].length
    Q[1].textContent = Q2.toFixed(3)

    let Q3 = 0
    for (let i = 0; i < factors.length; i++) {
        for (let j = 0; j < factors[i].length; j++) {
            Q3 += (
                parseFloat(block_means[i][j].textContent) -
                parseFloat(col_means[j].textContent) -
                parseFloat(row_means[i].textContent) + 
                parseFloat(general_mean.textContent)
            ) ** 2
        }
    }
    Q3 *= factors[0][0].length
    Q[2].textContent = Q3.toFixed(3)

    let Q4 = 0
    for (let j = 0; j < factors.length; j++)
        for (let k = 0; k < factors[j].length; k++)
            for (let i = 0; i < factors[j][k].length; i++)
                Q4 += (factors[j][k][i] - parseFloat(block_means[j][k].textContent)) ** 2
    Q[3].textContent = Q4.toFixed(3)

    let Q5 = 0
    for (let j = 0; j < factors.length; j++)
        for (let k = 0; k < factors[j].length; k++)
            for (let i = 0; i < factors[j][k].length; i++)
                Q5 += (factors[j][k][i] - parseFloat(general_mean.textContent)) ** 2
    Q[4].textContent = Q5.toFixed(3)

    S[0].textContent = (
        parseFloat(Q[0].textContent) / parseFloat(powers_of_freedom[0].textContent)
    ).toFixed(3)
    S[1].textContent = (
        parseFloat(Q[1].textContent) / parseFloat(powers_of_freedom[1].textContent)
    ).toFixed(3)
    S[2].textContent = (
        parseFloat(Q[2].textContent) / parseFloat(powers_of_freedom[2].textContent)
    ).toFixed(3)
    S[3].textContent = (
        parseFloat(Q[3].textContent) / parseFloat(powers_of_freedom[3].textContent)
    ).toFixed(3)
    S[4].textContent = (
        parseFloat(Q[4].textContent) / parseFloat(powers_of_freedom[4].textContent)
    ).toFixed(3)
}

function calculate_mean(sample) {
    let sum = 0
    for (let e of sample) sum += e
    return (sum / sample.length).toFixed(3)
}

function from_1d_to_2d(arr, chunk) {
    chunk = parseInt(chunk)
    let matrix = []

    for (let i = 0; i < chunk; i++) {
        matrix.push(arr.slice(i * chunk, i * chunk + chunk))
    }

    return matrix
}

function to_normal_mass(arr) {
    let res_arr = []
    for (let i = 0; i < arr.length; i++) res_arr.push(arr[i])
    return res_arr
}