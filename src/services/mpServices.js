import mercadopago from 'mercadopago'
import  config  from "../../config.js";
import { setPaid } from "../../http.js"

mercadopago.configurations.setAccessToken(config.MP_TOKEN);

class MpFunctions {
    constructor() {
        this.token = config.MP_TOKEN
    }

    async createCharge(userID) {
        try {
            
        const transactionData = {
            transaction_amount: 0.1,
            payment_method_id: "pix",
            description: 'App Sinais PRO',

            payer: {
                email: 'PAYER_EMAIL@gmail.com',
                first_name: 'Test',
                last_name: 'User',
                // identification: {
                //     type: 'CPF',
                //     number: '19119119100'
                // },
            },

            external_reference: `${userID}`,
            notification_url: `https://171d90e32ffb1d.lhr.life/webhook/${userID}`
        }

        const response = await mercadopago.payment.create(transactionData)
        
        const parsed = { QR_BASE64: response.response.point_of_interaction.transaction_data.qr_code_base64, code: response.response.point_of_interaction.transaction_data.qr_code }
        return parsed
        }
        catch (error) {
            console.log(error)
            return new Error("Error")
        }
    }

    async getPaymentInfo (pagamentoId) {
        try {
            const response = await mercadopago.payment.findById(pagamentoId)
            return response
        }catch (err) {
            console.log(err)
            return new Error("Error no getPaymentInfo")
        }
    }

    async hook (hook, socketID) {
        try {
            console.log(hook.action)
            console.log(socketID)
            console.log(hook.action == "payment.updated")
            if (hook.action == "payment.updated") {
                setPaid(socketID)
            }else {
                return
            }
       
            // const response = await getPaymentInfo(hook.data.id)
            // console.log(response)
        }catch (err) {
            return
        }
    }
}

export default new MpFunctions() 