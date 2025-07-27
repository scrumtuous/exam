import boto3

ssm = boto3.client('ssm', region_name='us-east-1')  # Change to your region
response = ssm.get_parameter(Name='/myapp/config/myencryptedparam')
value = response['Parameter']['Value']

with open('/home/parameter.txt', 'w') as f:
    f.write(value)
EOF

sudo python3 /home/get_param.py
cat /home/parameter.txt