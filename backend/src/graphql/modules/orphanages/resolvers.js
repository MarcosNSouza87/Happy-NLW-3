import connection from '../../../database/connection'
import crypto from 'crypto'

export default {
    Query:{
        Orphanages:()=> connection('orphanage').select('*'),
        Orphanage:(_,{id})=> connection('orphanage').where('id',id).first().then((row) => row)
    },
    Mutation:{
        createOrphanage: async(_,{ data }) => {
            //fazer verificação por email se o orfanato ja esta cadastrado
            console.log(data);
            const id= crypto.randomBytes(4).toString('hex');
            let newOrphanage = data;
            newOrphanage.id = id;
            await connection('orphanage').insert(newOrphanage);
            return newOrphanage;
        },
        updateOrphanage: async(_,{ id,data }) => {
            const Orphanage = await connection('orphanage')
            .where('id',id)
            .update(data)
            .catch(console.error);
            if(Orphanage === 1){
                return true;
            }
            return false;
        },
        deleteOrphanage: async(_,{ id }) => {
            const Orphanage = await connection('orphanage').where('id',id).select('*');
            if(Orphanage.length === 0)
            {
                return false;
            }
            await connection('orphanage').where('id',id).delete();
            return true
        },
    }
}