import { sendSavedDesignEmail } from '../emailService.js';

export async function testSavedDesignEmail() {
  try {
    console.log('Starting saved design email test...');

    const testDesignData = {
      customerEmail: 'reece@troosolutions.com', // Updated test email
      designId: 'test-design-123',
      modelName: 'Summit 308 Model B',
      dimensions: '14x22 (308 sq ft)',
      entryType: 'Side Entry',
      interiorType: 'Shell Only',
      sidingType: 'Lap',
      sidingColor: 'Iron Gray',
      doorColor: 'Factory Primed White',
      trimType: 'Clear Anodized Aluminum',
      fasciaColor: 'Iron Gray',
      soffitType: 'Unfinished',
      addOns: ['None'],
      // Optional fields
      flooring: 'N/A',
      finishes: 'N/A',
      designPreviewUrl: 'https://example.com/preview.jpg'
    };

    console.log('Sending test email with the following data:', JSON.stringify(testDesignData, null, 2));

    const result = await sendSavedDesignEmail(testDesignData);

    console.log('Email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error };
  }
}

// Run the test if this is the main module
if (import.meta.url === import.meta.main) {
  testSavedDesignEmail()
    .then(({ success, result, error }) => {
      if (success) {
        console.log('Test completed successfully');
        process.exit(0);
      } else {
        console.error('Test failed:', error);
        process.exit(1);
      }
    });
} 