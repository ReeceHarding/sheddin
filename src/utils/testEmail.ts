import { sendOrderConfirmationEmail } from './emailService';

async function testEmailSending() {
  console.log('Starting email test...');
  
  const testOrderDetails = {
    orderId: '123456789',
    customerName: 'Test Customer',
    customerEmail: 'reeceharding@gmail.com', // Replace with your email to test
    modelDetails: {
      name: 'Summit 308 Model B',
      size: '14x22 (308 sq ft)',
    },
    selectedOptions: {
      entry: 'Side Entry',
      siding: 'Plank',
      sidingColor: 'Mountain Sage',
      windows: 'More Privacy',
      interior: 'Fully Equipped',
      exteriorAddons: ['Metal Wainscot'],
    },
    pricing: {
      basePrice: 41090,
      totalPrice: 75590,
    },
  };

  try {
    console.log('Sending test email...');
    const result = await sendOrderConfirmationEmail(testOrderDetails);
    console.log('Email sending result:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testEmailSending(); 