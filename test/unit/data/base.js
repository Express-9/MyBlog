const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.getAll()', () => {
	const db = {
		collection: () => { },
	};
	let items = [];

	let ModelClass = null;
	let data = null;

	const toArray = () => {
		return Promise.resolve(items);
	};

	const find = (filter) => {
		if (!filter) {
			return {
				toArray,
			};
		}
		return {
			toArray: () => {
				const filteredItems = items.filter((item) => {
					for (const i in Object.keys(filter)) {
						const key = Object.keys(filter)[i];
						if (filter[key] !== item[key]) {
							return false;
						}
					}
					return true;
				});
				return Promise.resolve(filteredItems);
			},
		};
	};

	describe('when there are items in db', () => {
		beforeEach(() => {
			items = [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }];
			sinon.stub(db, 'collection')
				.callsFake(() => {
					return { find };
				});
			ModelClass = class {
			};

			// Arrange
			data = new BaseData(db, ModelClass);
		});

		afterEach(() => {
			db.collection.restore();
		});

		it('expect to return items', () => {
			return data.getAll()
				.then((models) => {
					expect(models).to.deep.equal(items);
				});
		});
		it('expect to return item by filter', () => {
			return data.filterBy({ _id: 1 })
				.then((models) => {
					expect(models).to.deep.equal([items[0]]);
				});
		});
	});
});
