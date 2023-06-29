export const issueCredential = async (schemaUrl, ethAddress, subjectData) => {
    const apiKey = process.env.DISCO_API_KEY;  
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


  