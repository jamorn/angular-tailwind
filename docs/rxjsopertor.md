# Understanding RxJS Operators with Mixed Train Service 🚄

## Introduction
In real applications, data streams often contain mixed types - like a train carrying both passengers (user data) and cargo (system data).

## Train Components

### Train Data Structure
```typescript
interface TrainPayload {
  passengers: UserInfo[];     // 👥 Passenger information
  cargo: PackageInfo[];      // 📦 Cargo information
  trackInfo: RouteStatus;    // 🛤️ Railway status
}
```

## Core Operators for Mixed Service

### of - Train Departure
```typescript
of({
  passengers: currentUsers,
  cargo: shipments,
  trackInfo: routeStatus
}) // 🚄 -> [Mixed Load]
```

### map - Segregation Station
```typescript
// แยกผู้โดยสารและสินค้า
map(train => ({
  passengerArea: processPassengers(train.passengers),   // 👥
  cargoArea: processCargo(train.cargo),                // 📦
  status: train.trackInfo                              // ℹ️
}))
```

### filter - Passenger & Cargo Check
```typescript
// ตรวจสอบทั้งผู้โดยสารและสินค้า
filter(train => {
  const validPassengers = train.passengers.every(p => p.hasTicket);
  const validCargo = train.cargo.every(c => c.isSealed);
  return validPassengers && validCargo;
})
```

### mergeMap - Multi-Platform Service
```typescript
// จัดการหลายขบวนพร้อมกัน
mergeMap(train => {
  const passengerService = handlePassengers(train.passengers);
  const cargoService = handleCargo(train.cargo);
  return forkJoin([passengerService, cargoService]);
})
```

## Real-World Example

```typescript
this.trainService.getDailyOperation().pipe(
  tap(train => {
    console.log('🚉 Train arriving:', train.id);
    console.log(`👥 Passengers: ${train.passengers.length}`);
    console.log(`📦 Cargo: ${train.cargo.length} items`);
  }),
  
  // แยกประเภทการบริการ
  map(train => ({
    vip: train.passengers.filter(p => p.isVIP),
    regular: train.passengers.filter(p => !p.isVIP),
    express: train.cargo.filter(c => c.isExpress),
    normal: train.cargo.filter(c => !c.isExpress)
  })),
  
  // ตรวจสอบความปลอดภัย
  filter(services => {
    const securityCheck = checkSecurity(services);
    console.log('🔒 Security Status:', securityCheck);
    return securityCheck.passed;
  }),
  
  // จัดการเหตุฉุกเฉิน
  catchError(error => {
    console.error('🚨 Emergency Stop:', error);
    return of(EMERGENCY_PROTOCOL);
  }),
  
  // สรุปการให้บริการ
  tap(finalService => {
    console.log('✅ Service Complete:', {
      passengersSatisfaction: calculateSatisfaction(finalService),
      cargoDeliveryRate: calculateDelivery(finalService)
    });
  })
)
```

## Service Processing Guidelines

1. **Initial Check** (tap)
   - Verify passenger manifests
   - Check cargo documentation
   - Monitor train system status

2. **Service Segregation** (map)
   - Separate passenger services
   - Organize cargo by priority
   - Coordinate mixed services

3. **Quality Control** (filter)
   - Passenger safety checks
   - Cargo integrity verification
   - Route condition assessment

4. **Emergency Protocols** (catchError)
   - Passenger safety measures
   - Cargo protection procedures
   - Alternative route planning

## Summary of RxJS Operators 📊

### Basic Operators Overview
| Operator | Symbol | Function | Example |
|----------|---------|-----------|---------|
| of | 🏁 | Creates new data stream | `of(userData)` |
| pipe | 🔄 | Chains operators | `source$.pipe()` |
| map | 🔨 | Transforms data | `map(data => modified)` |
| tap | 👀 | Inspects without changes | `tap(data => console.log())` |
| filter | ✂️ | Filters data | `filter(item => item.valid)` |
| catchError | 🚨 | Handles errors | `catchError(err => backup)` |
| mergeMap | 🔀 | Processes parallel tasks | `mergeMap(x => parallel())` |

### Data Flow Process
1. **Creation** (of)
   ```typescript
   of(initialData) // 🏁 Start
   ```

2. **Processing** (pipe + operators)
   ```typescript
   pipe(
     tap(data => log),     // 👀 Inspect
     map(data => modify),  // 🔨 Transform
     filter(data => check) // ✂️ Filter
   )
   ```

3. **Error Handling** (catchError)
   ```typescript
   catchError(error => {
     logError(error)      // 📝 Log
     return backup        // 🔄 Recovery
   })
   ```

### Best Practices
1. **Inspection (tap)**
   - Log data flow
   - Debug issues
   - No data modification

2. **Transformation (map)**
   - Clean data format
   - Extract needed info
   - Prepare for use

3. **Validation (filter)**
   - Check data quality
   - Verify requirements
   - Ensure data integrity

4. **Recovery (catchError)**
   - Handle failures
   - Provide backups
   - Log issues

---
*Updated: June 10, 2025*
