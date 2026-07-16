const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/account.model")
const emailService = require("../services/email.service")

async function createTransaction(req, res) {
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "FromAccount,toAccount,amount and idempotencyKey are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if (isTransactionAlreadyExists) {

        if (isTransactionAlreadyExists.status == "COMPLETE") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })
        }

        if (isTransactionAlreadyExists.status == "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing",
                transaction: isTransactionAlreadyExists
            })
        }

        if (isTransactionAlreadyExists.status == "FAILED") {
            return res.status(500).json({
                message: "Transaction processing failed previously. please retry"
            })
        }
    }
}

module.exports = {
    createTransaction
} 
if(!fromAccount.status !=="ACTIVE" || toUserAccount.status !=="ACTIVE"){
    return res.status(400).json({
        message:"Both fromAccount and must be to process transaction"
    })

} 

const balance = await fromUserAccount.getBalance()

if(balance <amount){
   return  res.status(400).json({
        message:`Insufficient balance. Current balance is ${balance}.Requested amount is ${amount}`
    })
}