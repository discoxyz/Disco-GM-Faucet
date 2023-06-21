export const issueCredential = async (schemaUrl, ethAddress, subjectData) => {
    const apiKey = '3e7d11c4-787b-4194-a53c-98e239ac3372'; // Replace with your env variable
  
    const requestUrl = 'https://api.disco.xyz/v1/credential';

    const requestBody = JSON.stringify({
      "schemaUrl": schemaUrl,
      "recipientDID": `did:ethr:${ethAddress}`,
      "subjectData": subjectData
    });
  
    try {
      console.log("posting...");
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: requestBody,
      });
  
      if (!response.ok) {
        throw new Error('Failed to issue credential');
      }
  
      const credential = await response.json();
      console.log('Issued credential:', credential);
      return credential;
    } catch (error) {
      console.error('Failed to issue credential:', error);
      throw error;
    }
  };
  