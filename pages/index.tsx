import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../components";
import { issueCredential } from "../utils/discoClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();

  const loading = (accountLoading);

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
  

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
          Welcome to the Disco GM Faucet! 🚰
        </h1> 
        <h3> 
          Click the button below to recieve a GM Credential in your data backpack.
        </h3>

        <Button
          loading={accountLoading}
          onClick={() => issueGmCredential(accountData?.address || '')}
        >
          Receive GM Credential!
        </Button>
      </>
    );
  };

  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>

      <ToastContainer />
    </>
  );
};

export default Home;


const issueGmCredential = async (recipient: string): Promise<void> => {
  const schemaUrl = 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json';

  try {
    console.log(`Issuing cred to: ${recipient}`);
    const credential = await issueCredential(schemaUrl, recipient, {});
    // console.log('Issued credential:', credential);
    if (credential) { 
      displayToast();
    }

  } catch (error) {
    console.error('Failed to issue credential:', error);
  }
};

const displayToast = () => {
  toast.info(
    <div>
      Credential issued successfully! Visit your data backpack {''}
      <a href="https://app.disco.xyz" className="text-blue-500">
        here
      </a>{' '}
      to see it.
    </div>,
    {
      autoClose: 10000, // Duration in milliseconds (10 seconds)
    }
  );
}