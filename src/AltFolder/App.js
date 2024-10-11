<div>


      <div className='container'>
        {/*  Navigation  bar  */}
        <Navigation account={account} connectWallet={connectWallet}/>



        {/* Main Content. This has to do with creating a claim and listing their current claims.  */}
        <h1>Theki Token System</h1>

        {account ? (
          <>
            {/* Display connected account */}
            <p>Connected account: {shortenAddress(account)}</p>

            {/* Form to create a new claim */}
            <h2>Create a new Claim</h2>
            <input 
              type="text" 
              value={claimContent} 
              onChange={(e) => setClaimContent(e.target.value)} 
              placeholder="Enter your claim"
            />
            <button onClick={createClaims} disabled={!thekiToken}>
              Submit Claim
            </button>

            
            {/* Display list of claims */}
            <h2>Your claims</h2>
            {claims.length > 0 ? (null) : (<h3>No Claims Made</h3>)}
            <ul>
              {claims.map((claim, index) => ( // claim is the whole struct. Meaning you can call the 4 values of the struct. Id, address of who made the claim, content of the claim and if verified
                <li key={index}>
                  ID: {claim.id.toString()} | Content: {claim.content} | Verified: {claim.verified.toString()}
                </li>
              ))}
            </ul>
  
          </>
        ) : (
          // Prompt user to connect wallet if not connected
          <p>Please connect your wallet to use the Application</p>
        )}
      
    



         { /* Everything below has to do with searching a user and verifying claims. */ }  
        
        <section>
          {account ? (
            <>

            <h2>Get the claims of a professional</h2>
            <input 
              type="text" 
              value={searchAddress} 
              onChange={(e) => setSearchAddress(e.target.value)} 
              placeholder="Enter professional's address"
            />
            <button onClick={searchProfessionalClaims}>
              Grab Claims
            </button>


            { /* This checks if the searchedClaims array is filled. If it is it will show the claims that the user searched. If the array does not exist it will do nothing.  */ }
            {searchedClaims.length > 0 && (
              <div>
                <h3>Claims by {shortenAddress(searchAddress)}</h3>
                <ul>
                  {searchedClaims.map((claim, index) => (
                    <li key={index}>
                      <strong>ID:</strong> {claim.id.toString()} <br />
                      <strong>Content:</strong> {claim.content} <br />
                      <strong>Verified:</strong> {claim.verified.toString()} <br />

                      {/* This checks if the claim is verified or not. Also checks if the account that is verifying the claim is not the same account that created it. If both pass, then the verify button will show up.  */}

                      {!claim.verified && 
                        claim.professional.toLowerCase() !== account.toLowerCase() && (
                          <>
                            <br />
                            <button onClick={() => verifyClaims(claim.id)}>Verify</button>
                          
                          </>
                        )
                      
                      }
                    </li>
                  ))}
                </ul>


              </div>
            )}


            </>

          ) : (
            null

          )}

        </section>  

      </div>

    </div>