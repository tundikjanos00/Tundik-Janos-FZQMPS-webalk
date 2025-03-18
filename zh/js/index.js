module.exports.createHttpHeaders = (input) =>
{
    if (!Array.isArray(input))
    {
        return {};
    }

    const headers = {};

    input.forEach(header =>
    {
        const [name, ...values] = header;
        const lowerCaseName = name.toLowerCase();
        if (headers[lowerCaseName]) {
            headers[lowerCaseName] += `, ${values.join(', ')}`;
        } else {
            headers[lowerCaseName] = values.join(', ');
        }
    });

    return headers;
};
module.exports.getItems = (items, params) =>
{
    if (!Array.isArray(items) || !params)
    {
        return [];
    }

    const { page = 1, pageSize = 10, sort = 'asc' } = params;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const sortedItems = items.slice().sort((a, b) =>
    {
        if (sort === 'asc')
        {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });

    const paginatedItems = sortedItems.slice(startIndex, endIndex);

    return paginatedItems.map(item =>
    ({
        id: item.id,
        title: { main: item.displayTitle },
    }));
};
