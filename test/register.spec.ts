import {assert, expect} from 'chai';
import * as sinon from 'sinon';

import {register} from '../src';
register();

function makeSuite() {
    const suiteSpy = sinon.spy();
    const suite = () => {
        it('bar', suiteSpy);
    };
    return {suiteSpy, suite};
}
const kit2 = makeSuite();
const kit3SuiteSpy = sinon.spy();

describe("fake tests and suites that should run before the 'assuming modifier' suite", () => {


    const kit1 = makeSuite();
    describe("testing", kit1.suite);

    describe("assumptions", () => {
        it("suite is called by default", () => {
            expect(kit1.suiteSpy).to.have.callCount(1);
        });
    });

    describe.assuming(false, 'fake false assumption')("testing", kit2.suite);

    describe("testing", () => {
        it.assuming(false, 'fake false assumption')('bar', kit3SuiteSpy);
    });
});

describe("assuming modifier", () => {
    describe("is applied to 'describe'", () => {

        it("is inactive on true value", () => {
            assert.isFunction(describe.assuming);
            expect(describe.assuming(true)).to.equal(describe);
        });
        it("is skipping on false value", () => {
            expect(kit2.suiteSpy).to.have.callCount(0);
        });
    });

    it("is applied to 'xdescribe'", () => {
        assert.isFunction(xdescribe.assuming);
        expect(xdescribe.assuming(true)).to.equal(xdescribe);
        expect(xdescribe.assuming(false)).to.equal(xdescribe);
    });

    describe("is applied to 'it'", () => {

        it("is inactive on true value", () => {
            assert.isFunction(it.assuming);
            expect(it.assuming(true)).to.equal(it);
        });
        it("is skipping on false value", () => {
            expect(kit3SuiteSpy).to.have.callCount(0);
        });
    });

    it("is applied to 'xit'", () => {
        assert.isFunction(xit.assuming);
        expect(xit.assuming(true)).to.equal(xit);
        expect(xit.assuming(false)).to.equal(xit);
    });

});
