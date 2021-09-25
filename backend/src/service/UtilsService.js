async function uploadPhotoProfile(request, response) {
    
    const { photo } = request.body;

    if (photo.trim() != '')  {

        let localUri = photo;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let typefile = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();

        formData.append('name', 'avatar');
        formData.append('image', {
            uri: localUri,
            type: typefile,
            name: filename
        });

        await fetch('http://192.168.0.109:3333/photosprofileeasybook', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then(r => r.json())
        .then(file =>{
            return response.json({ res: file.file, sucess: file.success });
        })
        .catch(error => {
            return response.json({ res: error.message, sucess: file.success });
        })
    }
}

module.exports = { uploadPhotoProfile }