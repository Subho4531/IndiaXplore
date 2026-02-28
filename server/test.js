
async function test() {
    try {
        console.log("Registering user...");
        const resReg = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Aadhar',
                email: 'testaadhar@example.com',
                password: 'password123',
                role: 'traveller',
                aadharNumber: '999988887777'
            })
        });
        const regData = await resReg.json();
        console.log("Register Response:", resReg.status, regData);

        console.log("\nLogging in with incorrect Aadhar...");
        const resLogFail = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testaadhar@example.com',
                password: 'password123',
                aadharNumber: '000000000000',
                role: 'traveller'
            })
        });
        console.log("Login Fail Response:", resLogFail.status, await resLogFail.json());

        console.log("\nLogging in with correct Aadhar...");
        const resLogSuccess = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testaadhar@example.com',
                password: 'password123',
                aadharNumber: '999988887777',
                role: 'traveller'
            })
        });
        console.log("Login Success Response:", resLogSuccess.status, await resLogSuccess.json());
    } catch (e) {
        console.error(e);
    }
}
test();
