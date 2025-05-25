│  │  ├─ modules
│  │  │  ├─ admin
│  │  │  │  ├─ admin.component.ts
│  │  │  │  ├─ admin.routes.ts
│  │  │  │  └─ entry
│  │  │  │     └─ oee
│  │  │  │        ├─ components
│  │  │  │        │  └─ oee-form
│  │  │  │        │     ├─ oee-form.component.css
│  │  │  │        │     ├─ oee-form.component.html
│  │  │  │        │     ├─ oee-form.component.spec.ts
│  │  │  │        │     └─ oee-form.component.ts
│  │  │  │        ├─ models
│  │  │  │        │  └─ oee-entry.model.ts
│  │  │  │        ├─ oee-entry.component.css
│  │  │  │        ├─ oee-entry.component.html
│  │  │  │        ├─ oee-entry.component.spec.ts
│  │  │  │        ├─ oee-entry.component.ts
│  │  │  │        └─ services
│  │  │  │           ├─ oee-entry.service.ts
│  │  │  │           └─ oee-mock.service.ts

ตอนนี้ผมได้ copy 
oee-entry.component.css -> oee-form.component.css
oee-entry.component.html -> oee-form.component.html
oee-entry.component.ts -> oee-form.component.ts

error ที่เกิดขึ้น 

[{
	"resource": "/d:/dashboard2025/Frontend/src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts",
	"owner": "typescript",
	"code": "2307",
	"severity": 8,
	"message": "Cannot find module './services/oee-mock.service' or its corresponding type declarations.",
	"source": "ts",
	"startLineNumber": 9,
	"startColumn": 32,
	"endLineNumber": 9,
	"endColumn": 61
},{
	"resource": "/d:/dashboard2025/Frontend/src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts",
	"owner": "typescript",
	"code": "2307",
	"severity": 8,
	"message": "Cannot find module './models/oee-entry.model' or its corresponding type declarations.",
	"source": "ts",
	"startLineNumber": 10,
	"startColumn": 34,
	"endLineNumber": 10,
	"endColumn": 60
},{
	"resource": "/d:/dashboard2025/Frontend/src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts",
	"owner": "_generated_diagnostic_collection_name_#3",
	"code": "-992003",
	"severity": 8,
	"message": "No suitable injection token for parameter 'mockService' of class 'OeeFormComponent'.\n  Consider using the @Inject decorator to specify an injection token.",
	"startLineNumber": 34,
	"startColumn": 13,
	"endLineNumber": 34,
	"endColumn": 24,
	"relatedInformation": [
		{
			"startLineNumber": 34,
			"startColumn": 26,
			"endLineNumber": 34,
			"endColumn": 40,
			"message": "This type does not have a value, so it cannot be used as injection token.",
			"resource": "/d:/dashboard2025/Frontend/src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts"
		}
	]
},{
	"resource": "/d:/dashboard2025/Frontend/src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts",
	"owner": "typescript",
	"code": "7006",
	"severity": 8,
	"message": "Parameter 'response' implicitly has an 'any' type.",
	"source": "ts",
	"startLineNumber": 131,
	"startColumn": 14,
	"endLineNumber": 131,
	"endColumn": 22
},{
	"resource": "/d:/dashboard2025/Frontend/src/app/modules/admin/entry/oee/components/oee-form/oee-form.component.ts",
	"owner": "typescript",
	"code": "7006",
	"severity": 8,
	"message": "Parameter 'error' implicitly has an 'any' type.",
	"source": "ts",
	"startLineNumber": 136,
	"startColumn": 15,
	"endLineNumber": 136,
	"endColumn": 20
}]
