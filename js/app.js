// Listen for submit
const form = document.querySelector('#loan-form').addEventListener('submit', (e) => {
    // Hide results
    document.querySelector('#results').style.display = 'none';
    // Show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults() {
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');

    const monthly_payment = document.querySelector('#monthly-payment');
    const total_payment = document.querySelector('#total-payment');
    const total_interest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculated_interest = parseFloat(interest.value) / 100 / 12;
    const calculated_payments = parseFloat(years.value) * 12;

    // Comput monthly payments
    const x = Math.pow(1 + calculated_interest, calculated_payments);
    const monthly = (principal * x * calculated_interest) / (x-1);

    if (isFinite(monthly)) {
        monthly_payment.value = monthly.toFixed(2);
        total_payment.value = (monthly * calculated_payments).toFixed(2);
        total_interest.value = ((monthly * calculated_payments) - principal).toFixed(2);

        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').style.display = 'block';
    } else {
        showError('Please check the entered information.');
    }
}

function showError(error) {
    const err = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    err.className = 'alert alert-danger';
    err.appendChild(document.createTextNode(error));
    
    card.insertBefore(err, heading);

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}