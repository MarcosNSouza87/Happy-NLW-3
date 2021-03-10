import connection from '../../../database/connection'
import crypto from 'crypto'

export default {
    Query:{
        Images:async()=> await connection('image').select('*'),
        Image:async(_,{id})=> await connection('image').where('id',id).first().then((row) => row),
        ImageByOrphanage:async(_,{orphanageid})=> await connection('image').where('orphanageid',orphanageid).select('*')
    },
    Mutation:{
        createImage: async(_,{ data }) => {
            //fazer verificação por email se o orfanato ja esta cadastrado
            const id= crypto.randomBytes(4).toString('hex');
            let newImage = data;
            newImage.id = id;
            
            await connection('image').insert(newImage);
            return newImage;
        },
        updateImage: async(_,{ id,data }) => {
            const Image = await connection('image').where('id',id);
            if(Image.lenght !== 0){
                return Image;
            }else{
                return null;
            }
        },
        deleteImage: async(_,{ id }) => {
            const Image = await connection('image').where('id',id).first().then((row) => row)
            if(Image.length > 0){
                return false;
            }
            await connection('image').where('id',id).delete();
            return true
        },
    }
}