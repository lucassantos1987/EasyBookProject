const connection = require('../database/connection');
const { index } = require('./SpecialityController');

module.exports = {
    async create(request, response) {
        const {
            id_provider,
            id_category,
            id_speciality
        } = request.body;

        const result = await connection('provider_category_speciality').insert({
            id_provider,
            id_category,
            id_speciality
        });

        return response.json({ result });
    },

    async index(request, response) {
        
        const filterCategory = request.query.id_category;
        const filterSpeciality = request.query.id_speciality;

        const data = await connection('provider_category_speciality')
        .join('category', 'category.id', 'provider_category_speciality.id_category')
        .join('speciality', 'speciality.id', 'provider_category_speciality.id_speciality')
        .join('provider', 'provider.id', 'provider_category_speciality.id_provider')
        .select('provider.id', 'provider.name', 'provider.last_name', 'provider.prefix_whatsapp', 'provider.whatsapp', 'provider.photo')
        .where('category.id', '=', filterCategory)
        .andWhere('speciality.id', '=', filterSpeciality);

        return response.json(data);
    },

    async listCatgorySpecialityProvider(request, response) {
        const id_povider = request.query.id_provier;

        const data = await connection('provider_category_speciality')
        .join('category', 'category.id', 'provider_category_speciality.id_category')
        .join('speciality', 'speciality.id', 'provider_category_speciality.id_speciality')
        .select('category.name', 'speciality.name')
        .where('provider_category_speciality.id_provider' , '=', id_povider);

        return response.json(data);
    }
}