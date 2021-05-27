calculate.onclick = () => {
    function reshape(arr, cols) {
        let newArr = []
        while(arr.length) newArr.push(arr.splice(0,cols))
        return newArr
    }

    let size_A = parseInt(document.getElementById('size_A').value)
    let size_B = parseInt(document.getElementById('size_B').value)

    let factors = []
    for (let i = 0; i < size_B; i++) {
        factors.push([])
        for (let j = 0; j < size_A; j++)
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

    //block_means = from_1d_to_2d(to_normal_mass(block_means), size_A)
    console.log(block_means)
    let ij = 0
    for (let i = 0; i < factors.length; i++)
        for (let j = 0; j < factors[i].length; j++) {
            console.log(ij)
            block_means[ij].textContent = calculate_mean(factors[i][j])
            ij++
        }
           


    for (let i = 0; i < factors[0].length; i++) {
        let arr = []
        for (let j = 0; j < factors.length; j++) {
            arr = arr.concat(factors[j][i])
        }
        col_means[i].textContent = calculate_mean(arr)
    }

    for (let i = 0; i < factors.length; i++) {
        let arr = []
        for (let j = 0; j < factors[i].length; j++) {
            arr = arr.concat(factors[i][j])
        }
        row_means[i].textContent = calculate_mean(arr)
    }
    
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

    ij = 0
    let Q3 = 0
    for (let i = 0; i < factors.length; i++) {
        for (let j = 0; j < factors[i].length; j++) {
            Q3 += (
                parseFloat(block_means[ij].textContent) -
                parseFloat(col_means[j].textContent) -
                parseFloat(row_means[i].textContent) + 
                parseFloat(general_mean.textContent)
            ) ** 2
            ij++
        }
    }
    Q3 *= factors[0][0].length
    Q[2].textContent = Q3.toFixed(3)

    ij = 0
    let Q4 = 0
    for (let j = 0; j < factors.length; j++)
        for (let k = 0; k < factors[j].length; k++, ij++)
            for (let i = 0; i < factors[j][k].length; i++)
                Q4 += (factors[j][k][i] - parseFloat(block_means[ij].textContent)) ** 2
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

    deleteChilds(document.getElementById('Fs'))

    let F_n = [0, 0, 0]
    let F_cr = [0, 0, 0]

    F_n[0] = (parseFloat(S[0].textContent) / parseFloat(S[3].textContent)).toFixed(5)
    let label = document.createElement('label')
    label.innerHTML = `F<sub>A</sub><sup>*</sup>=${F_n[0]}`
    document.getElementById('Fs').appendChild(label)

    F_n[1] = (parseFloat(S[1].textContent) / parseFloat(S[3].textContent)).toFixed(5)
    label = document.createElement('label')
    label.innerHTML = `F<sub>B</sub><sup>*</sup>=${F_n[1]}`
    document.getElementById('Fs').appendChild(label)

    F_n[2] = (parseFloat(S[2].textContent) / parseFloat(S[3].textContent)).toFixed(5)
    label = document.createElement('label')
    label.innerHTML = `F<sub>AB</sub><sup>*</sup>=${F_n[2]}`
    document.getElementById('Fs').appendChild(label)

    F_cr[0] = Fcr(0.05, parseFloat(powers_of_freedom[0].textContent) - 1, parseFloat(powers_of_freedom[3].textContent) - 1)
    label = document.createElement('label')
    label.innerHTML = `F<sub>crA</sub><sup>*</sup>=${F_cr[0]}`
    document.getElementById('Fs').appendChild(label)

    F_cr[1] = Fcr(0.05, parseFloat(powers_of_freedom[1].textContent) - 1, parseFloat(powers_of_freedom[3].textContent) - 1)
    label = document.createElement('label')
    label.innerHTML = `F<sub>crB</sub><sup>*</sup>=${F_cr[1]}`
    document.getElementById('Fs').appendChild(label)

    F_cr[2] = Fcr(0.05, parseFloat(powers_of_freedom[2].textContent) - 1, parseFloat(powers_of_freedom[3].textContent) - 1)
    label = document.createElement('label')
    label.innerHTML = `F<sub>crAB</sub><sup>*</sup>=${F_cr[2]}`
    document.getElementById('Fs').appendChild(label)

    label = document.createElement('label')
    label.innerHTML = `F<sub>testA</sub><sup>*</sup>=${!(F_n[0] > F_cr[0])}`
    document.getElementById('Fs').appendChild(label)

    label = document.createElement('label')
    label.innerHTML = `F<sub>testB</sub><sup>*</sup>=${!(F_n[1] > F_cr[1])}`
    document.getElementById('Fs').appendChild(label)

    label = document.createElement('label')
    label.innerHTML = `F<sub>testAB</sub><sup>*</sup>=${!(F_n[2] > F_cr[2])}`
    document.getElementById('Fs').appendChild(label)

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
    //console.log(res_arr)
    return res_arr
}

function concat_v2(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) res.concat(arr[i])
    return res
}