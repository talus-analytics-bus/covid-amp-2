aws cloudformation update-stack \
  --stack-name covidamp-2 \
  --template-body file://build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Key=Project,Value=IDEA \
         Key=Project:Detail,Value=COVIDAMP2 \
