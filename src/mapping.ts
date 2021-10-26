import { BigInt, ethereum, Address } from "@graphprotocol/graph-ts"
import {
  idleCDOimplementation,
  OwnershipTransferred,
  Paused,
  Unpaused
} from "../generated/idleCDOimplementation/idleCDOimplementation"
import { ExampleEntity, trancheAAPrice } from "../generated/schema"

let TrancheAA: "0x9c3bC87693c65E740d8B2d5F0820E04A61D8375B"
let TrancheBB: "0x4473bc90118b18be890af42d793b5252c4dc382d"
let defaultAddress: "0x620E1cf616444d524c81841B85f60F8d3Ea64751"
export function handleBlock(block: ethereum.Block): void {
  let contract = idleCDOimplementation.bind(Address.fromString(defaultAddress))
  let entity = new trancheAAPrice(block.number.toString())
  entity.CDOPrice = contract.tranchePrice(Address.fromString(TrancheAA));
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.AAStaking(...)
  // - contract.AATranche(...)
  // - contract.BBStaking(...)
  // - contract.BBTranche(...)
  // - contract.FULL_ALLOC(...)
  // - contract.MAX_FEE(...)
  // - contract.ONE_TRANCHE_TOKEN(...)
  // - contract.allowAAWithdraw(...)
  // - contract.allowBBWithdraw(...)
  // - contract.depositAA(...)
  // - contract.depositBB(...)
  // - contract.fee(...)
  // - contract.feeReceiver(...)
  // - contract.getApr(...)
  // - contract.getContractValue(...)
  // - contract.getCurrentAARatio(...)
  // - contract.getIdealApr(...)
  // - contract.getIncentiveTokens(...)
  // - contract.governanceRecoveryFund(...)
  // - contract.guardian(...)
  // - contract.harvest(...)
  // - contract.idealRange(...)
  // - contract.incentiveTokens(...)
  // - contract.lastNAVAA(...)
  // - contract.lastNAVBB(...)
  // - contract.lastStrategyPrice(...)
  // - contract.limit(...)
  // - contract.liquidate(...)
  // - contract.oneToken(...)
  // - contract.owner(...)
  // - contract.paused(...)
  // - contract.priceAA(...)
  // - contract.priceBB(...)
  // - contract.rebalancer(...)
  // - contract.releaseBlocksPeriod(...)
  // - contract.revertIfTooLow(...)
  // - contract.skipDefaultCheck(...)
  // - contract.strategy(...)
  // - contract.strategyToken(...)
  // - contract.token(...)
  // - contract.trancheAPRSplitRatio(...)
  // - contract.trancheIdealWeightRatio(...)
  // - contract.tranchePrice(...)
  // - contract.unclaimedFees(...)
  // - contract.unlentPerc(...)
  // - contract.virtualPrice(...)
  // - contract.weth(...)
  // - contract.withdrawAA(...)
  // - contract.withdrawBB(...)
}

export function handlePaused(event: Paused): void { }

export function handleUnpaused(event: Unpaused): void { }
