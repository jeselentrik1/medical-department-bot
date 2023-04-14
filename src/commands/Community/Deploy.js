const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('deploy')
	.setDescription('Deploy the medical department')
    .addStringOption(option => 
        option.setName('time')
        .setDescription('Format: hh:mm AM/PM')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('site')
        .setDescription('Which site is the medical department deploying in?')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('type')
            .setDescription('The category of the question')
            .setRequired(true)
            .addChoices(
                { name: 'Mass deployment', value: 'Mass' },
                { name: 'Normal deployment', value: 'Normal' }
            )),
	async execute(interaction) {
        const dateString = interaction.options.getString('time')
        const site = interaction.options.getString('site')
        const type = interaction.options.getString('type')
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        const date = new Date(`${formattedDate} ${dateString}`);
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        const discordTimestamp = `<t:${unixTimestamp}:f>`;
        const until = `<t:${unixTimestamp}:R>`;
        const DeploymentEmbed = new EmbedBuilder()
        .setColor(0x3498DB)
        .setTitle(`${type} deployment`)
        .setDescription(`A ${type.toLowerCase()} deployment will be starting ${until}!`)
        .addFields(
            { name: 'Date:', value: discordTimestamp },
            { name: 'Host', value: `${interaction.user}` },
            { name: 'Site', value: site}
        )
        interaction.reply({ embeds: [DeploymentEmbed], content: "<@1032685559409283102>"})

	},
};

