const { createHttpHeaders, getItems } = require('../zh/js');

describe('index.js', () =>
{

    describe('createHttpHeaders', () =>
    {

        it('should return an empty object for an empty input', () =>
        {
            expect(createHttpHeaders([])).toEqual({});
        });

        it('should return a single header', () =>
        {
            expect(createHttpHeaders([
                ['Content-Type', 'application/json']
            ])).toEqual({
                'content-type': 'application/json'
            });
        });

        it('should return multiple headers', () =>
        {
            expect(createHttpHeaders([
                ['Cache-Control', 'no-cache', 'no-store', 'must-revalidate'],
                ['content-type', 'application/json']
            ])).toEqual({
                'cache-control': 'no-cache, no-store, must-revalidate',
                'content-type': 'application/json'
            });
        });

        it('should return a proper single header even if the info is scattered in the input, following the order of appearance', () =>
        {
            expect(createHttpHeaders([
                ['Accept', 'text/html'],
                ['Accept', 'application/json'],
            ])).toEqual({
                'accept': 'text/html, application/json'
            });
        });

        it('should return empty object if the input is not an array', () =>
        {
            expect(createHttpHeaders('invalid')).toEqual({});
        });

        it('should return an empty object if the input is an empty array', () =>
        {
            expect(createHttpHeaders([])).toEqual({});
        });
    });

    describe('getItems', () => {

        it('should return an empty array for an empty input', () =>
        {
            expect(getItems([], {})).toEqual([]);
        });

        it('should map the items properly', () =>
        {
            expect(getItems([
                { id: 1, title: '<main>item 1</main>', displayTitle: 'Item 1', metadata: {} }
            ],
            {
                page: 1,
                pageSize: 4,
                sort: 'asc',
                })).toEqual
            ([
                { id: 1, title: { main: 'Item 1' } }
            ]);
        });

        it('should take into account the pagination params', () =>
        {
            expect(getItems([
                { id: 1, title: '<main>item 1</main>', displayTitle: 'Item 1', metadata: {} },
                { id: 2, title: '<main>item 2</main>', displayTitle: 'Item 2', metadata: {} },
                { id: 3, title: '<main>item 3</main>', displayTitle: 'Item 3', metadata: {} },
                { id: 4, title: '<main>item 4</main>', displayTitle: 'Item 4', metadata: {} },
                { id: 5, title: '<main>item 5</main>', displayTitle: 'Item 5', metadata: {} },
            ],
            {
                page: 2,
                pageSize: 2,
                sort: 'asc',
            })).toEqual([
                { id: 3, title: { main: 'Item 3' } },
                { id: 4, title: { main: 'Item 4' } }
            ]);
        });

    });
});
