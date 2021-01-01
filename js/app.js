// Listen for submit
const form = document.querySelector('#loan-form').addEventListener('submit', calculateResults);

function calculateResults(e) {
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
    } else {
        console.log('error');
    }

    e.preventDefault();
}
