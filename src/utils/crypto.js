/**
 * Utility functions for cryptographic hashing using window.crypto.subtle
 */

export const hashData = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const saveToVault = async (travelers, vehicle) => {
    const records = JSON.parse(localStorage.getItem('secureVaultRecords')) || [];

    // Hash the critical data before saving
    const record = {
        id: window.crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        vehicle: vehicle || null,
        hashedUids: await Promise.all(travelers.map(t => hashData(t)))
    };

    records.push(record);
    localStorage.setItem('secureVaultRecords', JSON.stringify(records));
    return record;
};
