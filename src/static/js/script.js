var step = 1
var device = null
var code = ""
// Scroll to the top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Use "auto" for instant scrolling
  });
}

function scrollBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

// Call the function to scroll to the top
scrollToTop();


function copy () {
  navigator.clipboard.writeText(code)
}


function setDevice(selectedDevice) {
  device = selectedDevice
  handleRemoveUserMessage()

  verifyStep(step)
}

function handleUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
      if (step === 4) {
        handleNewUserMessage("Otimo! aqui está seu acesso ao nosso App de sinais GPT")
        handleNewUserMessage(`<a target="_blank" href="https://appsinais.online/newapp/" class="action-btn"> Acessar APP </a>`)

        handleNewUserMessage("Link do nosso grupo VIP")
        handleNewUserMessage(`<a target="_blank" href="https://t.me/AppSinais_GPT" class="action-btn"> Grupo Vip </a>`)
        step++
      }
      const reader = new FileReader();
      reader.onload = function (loadedEvent) {
        const img = document.createElement('img');
        img.src = loadedEvent.target.result;
        document.getElementById("container").innerHTML += `
              <div class="new-msg-right">
      <div class="client-msg msgs">
        <div>
          <img width="100%" height="100%" style="border-radius: 15px; margin-top: 15px;" src=${img.src}>
        </div>
      </div>
      <img width="35px" height="35px" style="border-radius: 50%; margin-top: 15px;" src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png">
    </div>
              `;
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}


function handleNewUserMessage(msg, type, noPerfil) {
  if (type) {
    setTyping()
  }

  setTimeout(() => {
    //     document.getElementById("container").innerHTML += `
    //   <div class="new-msg">
    //   ${!noPerfil ? '<img width="35px" height="35px" style="border-radius: 50%; margin-top: 15px;" src="https://cf.workana.com/logos/0caa94c5e96cfd6accbf8ffad877d602/qb/me_192_192.jpg">' : ""}
    //   <div class="user-msg msgs">
    //     <div>${msg}</div>
    //   </div>
    // </div>
    //   `

    const element = document.createElement("div")
    element.classList.add("new-msg")
    element.innerHTML = `
${!noPerfil ? '<img width="35px" height="35px" style="border-radius: 50%; margin-top: 15px;" src="https://cf.workana.com/logos/0caa94c5e96cfd6accbf8ffad877d602/qb/me_192_192.jpg">' : ""}
<div class="user-msg msgs">
  <div>${msg}</div>
</div>
`
    document.getElementById("container").appendChild(element)

    scrollBottom()

    // window.scrollTo({
    //   top: window.scrollY + 90,
    //   behavior: "smooth",
    // })

    // document.getElementById("container").lastElementChild.scrollIntoView({
    //   inline: "start",
    //   behavior: "smooth",
    // })

    // setTimeout(() => {
    //   window.scrollTo({
    //     top: window.scrollY - 45,
    //     behavior: "smooth",
    //   })
    // }, 300);



  }, 2300)

}

function handleRemoveUserMessage() {
  document.getElementById("container").removeChild(document.getElementById("container").lastChild)
}

function handleNewClientMessage(msg) {
  if (msg) {
    //   document.getElementById("container").innerHTML += `
    //   <div class="new-msg-right">
    //   <div class="client-msg msgs">
    //     <div>${msg}</div>
    //   </div>
    //   <img width="35px" height="35px" style="border-radius: 50%; margin-top: 15px;" src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png">
    // </div>
    // `
    const element = document.createElement("div")
    element.classList.add("new-msg-right")
    element.innerHTML = `
    <div class="client-msg msgs">
      <div>${msg}</div>
    </div>
    <img width="35px" height="35px" style="border-radius: 50%; margin-top: 15px;" src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png">
    `

    document.getElementById("container").appendChild(element)

    scrollBottom()

    // window.scrollTo({
    //   top: window.scrollY + 90,
    //   behavior: "smooth",
    // })

    // document.getElementById("container").lastElementChild.scrollIntoView({
    //   inline: "start",
    //   behavior: "smooth",
    // })

    // setTimeout(() => {
    //   window.scrollTo({
    //     top: window.scrollY - 95,
    //     behavior: "smooth",
    //   })
    // }, 100);

  }

  const result = verifyStep(step)

  // if (result === true) {
  //   step++
  // }

  return
}


function handleMsgInput() {
  const newMsg = document.querySelector("#msg-input").value

  if (newMsg === "" || newMsg === " ") {
    return
  }

  handleNewClientMessage(newMsg)

  document.querySelector("#msg-input").value = ""
}

// Pix Msg
// handleNewUserMessage(`
// <div class="new-msg">
//             <div class="user-msg msgs">
//               <div><img height="300px"  width="100%" src="data:image/jpeg;base64, ${qrCode}"/></div>
//             </div>
//         </div>
//  `)

// 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

function verifyStep(Step) {
  if (Step === 1) {
    const qrCode = "iVBORw0KGgoAAAANSUhEUgAABWQAAAVkAQAAAAB79iscAAAI0ElEQVR42u3dQXLjOAwFUN1A97+lbqDZuNoy8UG5e7qmJtTzIpXElvToHQrg53b+oNex0dLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tL+fe02vvbX/3599vLG+4rXG+//7a8Pv35cH7a9P/K+8/uK9xsDg5aWlpaWlpaWlpaW9iHa/Xrv602GS4/8ZzIOgPLuxxuvDycGLS0tLS0tLS0tLS3tU7TXArJS0u1Ksfi+1X4tNIcfQxU5PLcwaGlpaWlpaWlpaWlpn63dJ6OQpZ7cO8D+ub5EpqWlpaWlpaWlpaWlpQ2PSGOWZU5z78Y2m4L0WnzeFpW0tLS0tLS0tLS0tLTP0SZ8gqatbnlpw3DlmVdfttP9yYwoLS0tLS0tLS0tLS3tT9fOisD/8Me/yFShpaWlpaWlpaWlpaX9ydr8+gh1HAYkc17J3pWh+11oyb2FlpaWlpaWlpaWlpZ2be1RKrjSzhsGJFNzbrjBWaJK0oevb7TNPlpaWlpaWlpaWlpa2tW1aeZx2+KC0o62UnLWGrMtQ+9uT0tLS0tLS0tLS0tL+yhtKiVLUH9dUCkC68HWKZsk78L7voqkpaWlpaWlpaWlpaVdVDtUh0Nm5LU5t4feX/2trL7Wp8OH72dEaWlpaWlpaWlpaWlp19PmHlzq3+2fHb+mbMynrdX7ldVnAS0tLS0tLS0tLS0t7cra4Ziz0ojbwxBmM5jZFoa57kyDnndTl7S0tLS0tLS0tLS0tOtpi6yp+koP7sgV4/C/fPZ18wWVa2lpaWlpaWlpaWlpaZ+izVOXZ/fEpiWX4kaugI+5yrS0snWOlpaWlpaWlpaWlpb2Adqhmku8r3a0tQOcTWcwub+ZuqSlpaWlpaWlpaWlpV1NmyrGyRa2rQv03+930jUBJe23REtLS0tLS0tLS0tL+whtCR5J/bZaBKZr2+SSnEbZtPOGviEtLS0tLS0tLS0tLe3q2i+GK1OZlwYuJ587uuHK5mn3M6K0tLS0tLS0tLS0tLSraNPMY2m/naXZNz8Zez6sWU68HjbWbbS0tLS0tLS0tLS0tM/SpkD/s5ydltfXKCZrSfkn56SXSEtLS0tLS0tLS0tLu7o25ewPMSKlqBzy/T8mNoevoBjrV5DuMk0poaWlpaWlpaWlpaWlXU+bysEhoz9Xh/UUtfLG+Zngv3VRk+ldWlpaWlpaWlpaWlraB2hLLMnedd72wsvNvtld8lnadQiTlpaWlpaWlpaWlpb2Odoc2X+G9JHapms/nMrLNNmZb/CbNS8tLS0tLS0tLS0tLe1P19bRy1zc7fnZk57eVhZ5XWk7u7nT0tLS0tLS0tLS0tI+TjtElZQIkqOcfT2pBL9wD7Voe1QALS0tLS0tLS0tLS3tA7TDLrdc+h3dPdvXnscx09Laa2lpaWlpaWlpaWlpaR+i3SYHW6d8kRI1mTazpTDJ24oxtQJpaWlpaWlpaWlpaWnX19ZpypIj2bTuJtemNMrUUKwl533NS0tLS0tLS0tLS0tLu5S27drlui79VleVIk2Gyc4y7dmsipaWlpaWlpaWlpaW9iHaM0xdnr9KxO2zz7dPhjVTFzBPXdaokrIqWlpaWlpaWlpaWlra52iPUOGl3WspuaTeJQVM5hO0m7t8XfPS0tLS0tLS0tLS0tIupU1pIaWk24bCsJSSNX0kh0mmGjN9VbS0tLS0tLS0tLS0tKtrU51Y96d9ESY5n8nMe+WOEl8SbkpLS0tLS0tLS0tLS7uyti0R29PW8vHYVTsPLbl+BcdN4UpLS0tLS0tLS0tLS7u8tly6T6JK0vpSBTqsoFzWZvnfpfrT0tLS0tLS0tLS0tKupy3PTrOWe3hOQm25dZcCJnMwynl7BgEtLS0tLS0tLS0tLe1C2mshN3tNbnfmMMnh2iF5Mk1slvFOWlpaWlpaWlpaWlrap2jvIiSPHEvS1qJDQTp8JMeXNJUqLS0tLS0tLS0tLS3t6tpU9V3fqFElrfb6vxppkrIlhwr0PtWflpaWlpaWlpaWlpZ2Pe1k1jKVl+fn7rVUfDazluVpTYx/2E5HS0tLS0tLS0tLS0u7sraFtrxS9Z1dUTnsmmuSJ0vx+VV3j5aWlpaWlpaWlpaWdhXtpJNX23TDjray0mHWsh2pTEEmaYCTlpaWlpaWlpaWlpb2AdrUq8tp/Vt4Tjo3e59sjssP2gODlpaWlpaWlpaWlpb2Odq9qyeHYjEliJyl7ixVZAWknl4baUJLS0tLS0tLS0tLS7u6tlx/hOZcGsKcX3aUc7NLB3HWUKSlpaWlpaWlpaWlpX2O9vrsrYxA5uvP0skbyElRCs10WdqZR0tLS0tLS0tLS0tLu7q2idNPtV6KJcmhJemQttrOCxOW6auipaWlpaWlpaWlpaVdWTuXtWmPQ/HZrmDo+KXpzHLTL9MjaWlpaWlpaWlpaWlp19AO29/y65juhvtu9PK6oHRI25mLWVpaWlpaWlpaWlpa2odot9CX+2jElVUduQjMw5WpPThcNtkcR0tLS0tLS0tLS0tLu7I2vYZWWynzPirL0gAsD5t9rq7vfuqSlpaWlpaWlpaWlpZ2KW0u5Npj087yv3RFm2EyNAXziOY5O4OAlpaWlpaWlpaWlpZ2PW2TClnuVKcu29+GcjB37c5wv+27TBVaWlpaWlpaWlpaWtrVtLmA3ELcfxsw+fG6rqDmQ5bztX9nRpSWlpaWlpaWlpaWlvYx2pRIUuYqm1D+VDFOgv/bP2lpaWlpaWlpaWlpaR+r3UqeY64Oa0hkKT7rqt4F6RB4kvqLtLS0tLS0tLS0tLS0j9CmqctcJ57T9Mh6FttAKcOVNZzyvoqkpaWlpaWlpaWlpaVdTLvlC1KvbvKc+rB5XGSpRc+cKElLS0tLS0tLS0tLS7u69v//oqWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaX9a9p/AH64FbASzssEAAAAAElFTkSuQmCC"
    code = "00020126450014br.gov.bcb.pix0123vinyprog.work@gmail.com52040000530398654040.105802BR5925SILVAMARCOS202206131713056009Sao Paulo62240520mpqrinter6215369899763047A74"
    
    const maxLength = 35; // Quantidade máxima de caracteres desejada
    const shortedCode = code.substring(0, maxLength);

    function copy () {
      navigator.clipboard.writeText(code)
    }

    handleNewUserMessage(`
    <div class="new-msg">
            <div class="user-msg msgs">
              <div><img height="300px"  width="100%" src="data:image/jpeg;base64, ${qrCode}"/></div>
              <div class="pix-code-container"><span class="pix-code"> ${shortedCode}...</span> </div>
            </div>
        </div>
    `)
    
    
    return
    handleNewUserMessage("Para podermos continuar, você está acessando pelo celular ou pelo computador ?")
    handleNewUserMessage(`<div style="display: flex; gap: 35px;"> <button class="action-btn" onclick="setDevice('cel')"> Celular </button> <button class="action-btn" onclick="setDevice('pc')"> Computador </button> </div>`)
    step++
    return true
  }
  else if (Step === 2) {
    handleNewUserMessage("Faz teu cadastro no site que o app monitora, ( so funciona nele! )")
    if (device === "cel") {
      handleNewUserMessage(`<iframe src="https://playpix.com/affiliates/?btag=1020729_l176602" width="100%" height="530px" frameborder="0"></iframe>`, true, false)
    } else {
      handleNewUserMessage(`<a target="_blank" href="https://playpix.com/affiliates/?btag=1020729_l176602" class="action-btn"> Fazer Cadastro </a>`)
    }

    setTimeout(() => {
      handleNewUserMessage(`<button class="action-btn" onclick="verifyStep(3)"> Teminei de fazer meu cadastro! </button>`)
    }, 3000);

    step++
    return true
  }
  else if (Step === 3) {
    handleRemoveUserMessage()
    // registrou
    handleNewUserMessage("Muito bem, sua licenca está 90% garantida, porém tem muita gente falando comigo e caso você acabe demorando muito terei que passar sua licença para outra pessoa que realmente quer fazer oque é preciso")

    setTimeout(() => {
      handleNewUserMessage("Me manda aqui embaixo uma print da sua conta com <span style='color=green'>qualquer valor <span> depositado e ja libero seu acessso ao App imediatamente")


      setTimeout(() => {
        handleNewUserMessage("Ah e somete para você, acabamos de liberar uma promoção exclusiva! caso deposite acima de R$ 50, <span style='color=green'> Seu Deposito será Dobrado!<span> depositou 50 recebe 100, depositou 100 recebe 200 !")
        handleNewUserMessage(`<a target="_blank" href="https://playpix.com/affiliates/?btag=1020729_l176602" class="action-btn"> Link da Plataforma </a>`)
      }, 5000)

      setTimeout(() => {
        handleNewUserMessage("So que faz isso o mais rápido possivel, pois como falei tem muita gente falando comigo... estou aguardando o seu print")
      }, 25000)

    }, 9000)
    step++
  }
  else if (Step === 4) {
    return true

    handleNewUserMessage("Me manda aqui embaixo uma print da sua conta com qualquer valor depositado e ja libero seu acessso ao App imediatamente")
    step++
  }
}

function setTyping() {
  return
  handleNewUserMessage("...", false)
  setTimeout(() => {
    handleRemoveUserMessage()
  }, 2000);
}


