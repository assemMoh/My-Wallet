import React, { useState } from 'react'

export function Header() {

  
  let [wallet, setWallet] = useState({
    amount: 0,
    type: 'deposit',
    message: ''
  })
  let [total, setTotal] = useState(0)
  let [entered, setEntered] = useState(false)
  let [save, setSaved] = useState(false)
  let [newTrans, setNewTrans] = useState(false)
  let [trans, setTrans] = useState([
    
  ])


  let onEnter = (e) => {
    setTotal(e.target.value)
    setEntered(true)
  }

  let onSave = () => {
    setSaved(true)
  }

  let makeTransaction = () => {
    setNewTrans(true)
  }

  let doneTrans = () => {
    setTrans([
      wallet, ...trans
    ])
    console.log(wallet.amount)
    console.log(total)
    let m = 0
    if (wallet.type == 'deposit'){
      m = parseInt(total) + parseInt(wallet.amount)
    }
    else{
      m = parseInt(total) - parseInt(wallet.amount)
    }
    setTotal(m)
    setWallet({
      amount: 0,
      type: 'deposit',
      message: ''
    })
    setNewTrans(false)
  }
  
  let setUpdate = (e) => {
    setWallet({
      ...wallet, [e.target.name]: e.target.value
    })
    
  }
  
  
  return (
    <>
      {!save && (
        <div style={{height: '80px'}} className='text-center d-flex align-items-center justify-content-center bg-secondary w-100'>
          <input placeholder='Enter your amount' className='w-25 h-50 border-bottom-0' type='number' min='1' onChange={onEnter}/>
          <input className='btn btn-success mx-3' onClick={onSave} type='button' value='Enter amount'/>
        </div>
      )}
      {entered && (
        <>
        <div className='text-center p-5 fs-1 fw-bold'>
          {total + " EGP"} 
        </div>
        {save && (
        <div className='d-flex justify-content-center my-4' style={{minHeight: "20vh"}}>
          <div className='w-25'>
            <div className='text-center'>
              <input className='text btn fs-4 btn-secondary m-3 w-75' onClick={makeTransaction} type='button'  value='Make transaction' />
            </div>

            {newTrans &&
            (
              <div className='border-black w-100 p-2'>
                <form >
                  <input type='number' min='1' className='p-2 my-2' onChange={setUpdate} name='amount' placeholder='add amount'/>
                  <br/>
                  <select name="type" style={{height: '40px'}} onChange={setUpdate} className='w-50'>
                    <option value='deposit'>Deposit</option>
                    <option value='withdraw'>Withdraw</option>
                  </select>
                  <br/>
                  <textarea className='h-50 my-2 w-100 p-2' onChange={setUpdate} name='message' placeholder='add message'/>
                  <br/>
                  <input onClick={doneTrans} type='submit' value="Save" className='btn btn-outline-success w-25' />
                  <input onClick={doneTrans} value="Cancel" className='btn btn-outline-danger mx-2 w-25' />
                </form>
              </div>
            )
            }


            <div className=' mb-5'>
              {trans.map( (m) => {
                return (
                <div className='p-3 mb-4' style={{border: '1px solid black', borderRadius: '5px'}}>

                  {(m.type == 'deposit') ? (
                    <>
                      <pre className='fw-bolder fs-5'>Type: <label style={{color: 'green'}}>{m.type}</label></pre>
                      <pre className='fw-bolder fs-5'>Amount: <label style={{color: 'green'}}>+{m.amount}</label></pre>
                    </>
                  ) : (
                    <>
                      <pre className='fw-bolder fs-5'>Type: <label style={{color: 'red'}}>{m.type}</label></pre>
                      <pre className='fw-bolder fs-5'>Amount: <label style={{color: 'red'}}>-{m.amount}</label></pre>
                    </>
                  )}
                  <pre className='fw-bolder fs-5'>Message: <label>{m.message}</label></pre>
                </div>
                )
              })}
            </div>
          </div>
        </div>
        )}
        </>
      )}
    </>
  )
}
