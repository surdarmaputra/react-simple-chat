import { expect } from 'chai';

import * as helpers from './helpers';

describe('helpers', function() {
	describe('getListFromObject()', function() {
		beforeEach(function() {
			this.listObject = {
				'obj1': {
					title: 'title',
					date: 'Nov 7',
					meta: 'meta'
				}
			};
			this.normalResult = [
				{
					id: 'obj1',
					title: 'title',
					date: 'Nov 7',
					meta: 'meta'
				}
			];
		});

		it('should return array of object which include search keyword', function() {
			const keyword = 'title';
			const searchablePropertyNames = ['title'];

			const result = helpers.getListFromObject(this.listObject, keyword, searchablePropertyNames);
			expect(result).to.be.deep.equal(this.normalResult);
		});

		it('should return empty array if no match found', function() {
			const keyword = 'titlex';
			const searchablePropertyNames = ['title'];
			const result = helpers.getListFromObject(this.listObject, keyword, searchablePropertyNames);
			expect(result).to.be.deep.equal([]);

		});

		it('should do not filtering if search keyoword not set', function() {
			const result = helpers.getListFromObject(this.listObject);
			expect(result).to.be.deep.equal(this.normalResult);
		});

		it('should return empty array if no argument supplied', function() {
			const result = helpers.getListFromObject();
			expect(result).to.be.deep.equal([]);
		});
	});
	describe('getListFromArray()', function() {
		beforeEach(function() {
			this.listArray = [
				{
					id: 'obj1',
					title: 'title',
					date: 'Nov 7',
					meta: 'meta'
				}
			];
		});
			
		it('should return array of object which include search keyword', function() {
			const keyword = 'title';
			const searchablePropertyNames = ['title'];

			const result = helpers.getListFromArray(this.listArray, keyword, searchablePropertyNames);
			expect(result).to.be.deep.equal(this.listArray);
		});

		it('should return empty array if no match found', function() {
			const keyword = 'titlex';
			const searchablePropertyNames = ['title'];
			const result = helpers.getListFromArray(this.listArray, keyword, searchablePropertyNames);
			expect(result).to.be.deep.equal([]);
		});

		it('should do not filtering if search keyoword not set', function() {
			const result = helpers.getListFromArray(this.listArray);
			expect(result).to.be.deep.equal(this.listArray);
		});

		it('should return empty array if no argument supplied', function() {
			const result = helpers.getListFromArray();
			expect(result).to.be.deep.equal([]);
		});
	});

	describe('isObjectContainsKeyword()', function() {
		beforeEach(function() {
			this.object = {
				id: 'obj1',
				title: 'title',
				date: 'Nov 7',
				meta: 'meta'
			};
			this.searchablePropertyNames = ['title'];
		});	

		it('should return true if object properties defined contain keyword', function() {
			const result = helpers.isObjectContainsKeyword(this.object, 'title', this.searchablePropertyNames);
			expect(result).to.be.equal(true);
		});	

		it('should return false if object properties defined do not contain keyword', function() {
			const result = helpers.isObjectContainsKeyword(this.object, 'titlex', this.searchablePropertyNames);
			expect(result).to.be.equal(false);
		});

		it('should return true if no keyword supplied', function() {
			const result = helpers.isObjectContainsKeyword(this.object);
			expect(result).to.be.equal(false);
		});

		it('should return false if no argument supplied', function() {
			const result = helpers.isObjectContainsKeyword();
			expect(result).to.be.equal(false);
		});
	});
});
