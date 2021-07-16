const connection = require('../database/connection');

module.exports = {

    async listProviderCategory(request, response) {

        const filterCategory = request.query.id_category;

        const data = await connection('provider_category')
            .join('category', 'category.id', 'provider_category.id_category')
            .join('provider', 'provider.id', 'provider_category.id_provider')
            .select('provider.id', 'provider.name', 'provider.last_name', 'provider.prefix_whatsapp', 'provider.whatsapp', 'provider.photo')
            .where('category.id', '=', filterCategory);

        return response.json(data);
    }
}