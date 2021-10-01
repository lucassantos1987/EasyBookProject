const uploadPhotoProfile = async (photo_profile) => {
    
    if (!photo_profile) {
        throw { message: 'Selecione a Foto.' }
    }

    let localUri = photo_profile;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let typefile = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('name', 'avatar');
    formData.append('image', {
        uri: localUri,
        type: typefile,
        name: filename
    });

    let photo = '';
    await fetch('http://192.168.0.109:3333/photosprofileeasybook', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        photo = data.file;
    })
    .catch(error => {
        throw ({ message: "aqui" + error.message });
    });

    return photo;
}

module.exports = {
    uploadPhotoProfile
}