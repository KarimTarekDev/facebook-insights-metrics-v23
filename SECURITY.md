# Security Policy

## Supported Versions

We provide security updates for the following versions of this project:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do NOT create a public issue

Please do not report security vulnerabilities through public GitHub issues, discussions, or other public channels.

### 2. Report privately

Send an email to [security@example.com](mailto:security@example.com) with the following information:

- **Subject**: `[SECURITY] Brief description of the vulnerability`
- **Description**: Detailed description of the vulnerability
- **Steps to reproduce**: Clear steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Suggested fix**: If you have suggestions for fixing the issue

### 3. What to expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Initial assessment**: We will provide an initial assessment within 5 business days
- **Regular updates**: We will keep you informed of our progress
- **Resolution**: We will work to resolve the issue as quickly as possible

### 4. Responsible disclosure

We follow responsible disclosure practices:

- We will not disclose the vulnerability publicly until it has been fixed
- We will credit you in our security advisories (unless you prefer to remain anonymous)
- We will work with you to ensure the fix is effective

## Security Best Practices

### For Users

1. **Keep dependencies updated**: Regularly update your dependencies to get security patches
2. **Use HTTPS**: Always use HTTPS when transmitting data
3. **Validate inputs**: Validate all inputs before processing
4. **Monitor logs**: Monitor application logs for suspicious activity
5. **Use environment variables**: Store sensitive configuration in environment variables

### For Developers

1. **Code review**: All code changes must be reviewed before merging
2. **Dependency scanning**: Regular dependency vulnerability scanning
3. **Input validation**: Validate all inputs using Zod schemas
4. **Error handling**: Implement proper error handling without exposing sensitive information
5. **Logging**: Log security-relevant events appropriately

## Security Considerations

### Data Privacy

- This MCP server does not store or transmit personal data
- All metrics data is sourced from public Facebook Graph API documentation
- No authentication tokens or API keys are required for basic functionality

### Network Security

- The server communicates via stdio (standard input/output)
- No network ports are opened by default
- All communication is handled by the MCP client

### Input Validation

- All inputs are validated using Zod schemas
- Search queries are sanitized before processing
- File paths are validated to prevent directory traversal

### Dependencies

- All dependencies are regularly updated
- We use only well-maintained, reputable packages
- Dependencies are scanned for known vulnerabilities

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will include:

- Vulnerability fixes
- Security improvements
- Dependency updates
- Documentation updates

## Contact

For security-related questions or concerns, please contact:

- **Email**: [security@example.com](mailto:security@example.com)
- **PGP Key**: [Available upon request]

## Acknowledgments

We thank the security researchers and community members who help us maintain the security of this project through responsible disclosure.

## History

- 2025-09-19: Initial security policy created
