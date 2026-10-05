export function resolvePromise(prms,promiseState){

    function resolvedACB(datad){
        if(promiseState.promise !== prms) {
            return;}
        promiseState.data = datad;
        
    }
    function errorACB(err){
        if(promiseState.promise !== prms) {
            return;}
        promiseState.error = err;
        
    
    }


if(!prms) {
promiseState.promise = null;
promiseState.data = null;
promiseState.error = null;
return;
}

promiseState.promise = prms;
promiseState.data = null;
promiseState.error = null;

prms.then(resolvedACB).catch(errorACB)




}