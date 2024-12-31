import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const {ethereum} = window;

export function Balance() {
    const {register, handleSubmit } = useForm();


    const [cuenta, setCuenta] = useState(null);
    const [balance, setBalance] = useState(null);
    const [resultadotxOK, setResultadotxOK] = useState(null);
    const [resultadotxError, setResultadotxError] = useState(null);

   /* useEffect(() => {
        if (ethereum) {
            ethereum.request({ method: "eth_requestAccounts" })
                .then(cuentas => {
                    setCuenta(cuentas); // Guardar la lista de cuentas
                })
                .catch(error => {
                    console.error("Error al solicitar cuentas:", error);
                });
        }
    }, []);*/

    // Efecto para solicitar las cuentas y obtener el balance
    useEffect(() => {
        if (ethereum) {
            // Solicita las cuentas conectadas a MetaMask
            ethereum.request({ method: "eth_requestAccounts" })
                .then(cuentas => {
                    const cuentaActual = cuentas[0]; // Toma la primera cuenta de la lista
                    setCuenta(cuentaActual); // Guarda la cuenta en el estado

                    // Solicita el balance de la cuenta
                    return ethereum.request({
                        method: "eth_getBalance",
                        params: [cuentaActual, "latest"] // Dirección y bloque más reciente
                    });
                })
                .then(balanceHex => {
                    // Convierte el balance de formato hexadecimal a decimal en Ether
                    const balanceEnEther = parseFloat(ethereum.utils.fromWei(balanceHex, "ether"));
                    setBalance(balanceEnEther); // Guarda el balance en el estado
                })
                .catch(error => {
                    console.error("Error al obtener cuentas o balance:", error);
                });
        }
    }, []);

    async function submit(data){
        console.log(data);

        const transactionParameters = {
            to: formulario.cuenta, 
            from: ethereum.selectedAddress, 
            value: ethers.utils.parseEther(formulario.importe).toHexString()
        };
        try {
            const txHash = await ethereum.request({
                                    method: 'eth_sendTransaction',
                                    params: [transactionParameters],
                            });
            setResultadotxOK(txHash)
            } 
            catch (error) {
                setResultadotxError(error)
            }
    }

    
    if(!ethereum) {
        return <h2>No hay metamask</h2>
    } 
    return(
        <div>
        <p>{cuenta ? `Cuenta: ${cuenta}` : "Cargando cuenta..."}</p>
        <p>{balance !== null ? `Balance: ${balance} ETH` : "Cargando balance..."}</p>

        <form className="form-inline" onSubmit={handleSubmit(submit)}>
            <div className="form-group mb-3">
                <label htmlFor="address">Address</label>
                 <input defaultValue="0xe0fa3AB82068b8BE514F75179182b7409b1dA51C" id="address" className="form-control" {...register("address")} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="amount">Amount</label>
                 <input defaultValue="0.0012" id="amount" className="form-control" {...register("amount")} />
            </div>
            <button type="submit" className="btn btn-primary">Transferir</button>
        </form>
        </div>
    );
}