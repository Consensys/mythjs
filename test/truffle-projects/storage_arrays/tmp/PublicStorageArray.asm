
======= contracts/PublicStorageArray.sol:PublicStorageArray =======
EVM assembly:
    /* "contracts/PublicStorageArray.sol":26:101  contract PublicStorageArray {... */
  mstore(0x40, 0x80)
    /* "contracts/PublicStorageArray.sol":60:98  bytes32[] public STATES = [bytes32(0)] */
  0x20
  mload(0x40)
  swap1
  dup2
  add
  0x40
  mstore
  dup1
    /* "contracts/PublicStorageArray.sol":95:96  0 */
  0x0
    /* "contracts/PublicStorageArray.sol":87:97  bytes32(0) */
  0x1
  mul
    /* "contracts/PublicStorageArray.sol":60:98  bytes32[] public STATES = [bytes32(0)] */
  not(0x0)
  and
  not(0x0)
  and
  dup2
  mstore
  pop
  0x0
  swap1
  0x1
  tag_1
  swap3
  swap2
  swap1
  jump	// in(tag_2)
tag_1:
  pop
    /* "contracts/PublicStorageArray.sol":26:101  contract PublicStorageArray {... */
  callvalue
    /* "--CODEGEN--":8:17   */
  dup1
    /* "--CODEGEN--":5:7   */
  iszero
  tag_3
  jumpi
    /* "--CODEGEN--":30:31   */
  0x0
    /* "--CODEGEN--":27:28   */
  dup1
    /* "--CODEGEN--":20:32   */
  revert
    /* "--CODEGEN--":5:7   */
tag_3:
    /* "contracts/PublicStorageArray.sol":26:101  contract PublicStorageArray {... */
  pop
  jump(tag_4)
tag_2:
  dup3
  dup1
  sload
  dup3
  dup3
  sstore
  swap1
  0x0
  mstore
  keccak256(0x0, 0x20)
  swap1
  dup2
  add
  swap3
  dup3
  iszero
  tag_5
  jumpi
  swap2
  0x20
  mul
  dup3
  add
tag_6:
  dup3
  dup2
  gt
  iszero
  tag_7
  jumpi
  dup3
  mload
  dup3
  swap1
  not(0x0)
  and
  swap1
  sstore
  swap2
  0x20
  add
  swap2
  swap1
  0x1
  add
  swap1
  jump(tag_6)
tag_7:
tag_5:
  pop
  swap1
  pop
  tag_8
  swap2
  swap1
  jump	// in(tag_9)
tag_8:
  pop
  swap1
  jump	// out
tag_9:
  tag_10
  swap2
  swap1
tag_11:
  dup1
  dup3
  gt
  iszero
  tag_12
  jumpi
  0x0
  dup2
  0x0
  swap1
  sstore
  pop
  0x1
  add
  jump(tag_11)
tag_12:
  pop
  swap1
  jump
tag_10:
  swap1
  jump	// out
tag_4:
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "contracts/PublicStorageArray.sol":26:101  contract PublicStorageArray {... */
      mstore(0x40, 0x80)
      jumpi(tag_1, lt(calldatasize, 0x4))
      calldataload(0x0)
      0x100000000000000000000000000000000000000000000000000000000
      swap1
      div
      0xffffffff
      and
      dup1
      0x2da83e68
      eq
      tag_2
      jumpi
    tag_1:
      0x0
      dup1
      revert
        /* "contracts/PublicStorageArray.sol":60:98  bytes32[] public STATES = [bytes32(0)] */
    tag_2:
      callvalue
        /* "--CODEGEN--":8:17   */
      dup1
        /* "--CODEGEN--":5:7   */
      iszero
      tag_3
      jumpi
        /* "--CODEGEN--":30:31   */
      0x0
        /* "--CODEGEN--":27:28   */
      dup1
        /* "--CODEGEN--":20:32   */
      revert
        /* "--CODEGEN--":5:7   */
    tag_3:
        /* "contracts/PublicStorageArray.sol":60:98  bytes32[] public STATES = [bytes32(0)] */
      pop
      tag_4
      0x4
      dup1
      calldatasize
      sub
      dup2
      add
      swap1
      dup1
      dup1
      calldataload
      swap1
      0x20
      add
      swap1
      swap3
      swap2
      swap1
      pop
      pop
      pop
      jump(tag_5)
    tag_4:
      mload(0x40)
      dup1
      dup3
      not(0x0)
      and
      not(0x0)
      and
      dup2
      mstore
      0x20
      add
      swap2
      pop
      pop
      mload(0x40)
      dup1
      swap2
      sub
      swap1
      return
    tag_5:
      0x0
      dup2
      dup2
      sload
      dup2
      lt
      iszero
      iszero
      tag_6
      jumpi
      invalid
    tag_6:
      swap1
      0x0
      mstore
      keccak256(0x0, 0x20)
      add
      0x0
      swap2
      pop
      swap1
      pop
      sload
      dup2
      jump	// out

    auxdata: 0xa165627a7a72305820c2d5ae1113e47fa354e05a9750acb27747ec94f3f66085a3b4fcc66a7ecff10a0029
}

